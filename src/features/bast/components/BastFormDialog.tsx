"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { bastService } from "@/services/bastService";
import { assetService } from "@/services/assetService";
import { categoryService } from "@/services/categoryService";
import { locationService } from "@/services/locationService";
import { userService } from "@/services/userService";
import { bastFormSchema, type BastFormValues } from "../schemas";
import { FileSpreadsheet, Plus, Trash2 } from "lucide-react";

const typeOptions = [
  { value: "assignment", label: "Assignment Handover" },
  { value: "return", label: "Return Handover" },
  { value: "procurement", label: "Procurement Receiving" },
  { value: "transfer", label: "Internal Transfer" },
  { value: "inventory", label: "Inventory" },
];

export function BastFormDialog() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: assets } = useQuery({
    queryKey: ["assets", "all"],
    queryFn: () => assetService.list({ limit: 100 }),
    enabled: open,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories", "all"],
    queryFn: () => categoryService.list(),
    enabled: open,
  });

  const { data: locations } = useQuery({
    queryKey: ["locations"],
    queryFn: () => locationService.list(),
    enabled: open,
  });

  const { data: users } = useQuery({
    queryKey: ["users", "all"],
    queryFn: () => userService.list({ limit: 100 }),
    enabled: open,
  });

  const form = useForm<BastFormValues>({
    resolver: zodResolver(bastFormSchema),
    defaultValues: {
      judul: "",
      tipe: "assignment",
      tanggal_serah_terima: new Date().toISOString().split("T")[0],
      pihak_pertama: "",
      pihak_pertama_jabatan: "",
      pihak_kedua: "",
      pihak_kedua_jabatan: "",
      lokasi: "",
      catatan: "",
      items: [{ nama: "", kode: "", jumlah: 1, kondisi: "Baik", keterangan: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  async function onSubmit(data: BastFormValues) {
    try {
      await bastService.create(data);
      toast.success("BAST document created");
      queryClient.invalidateQueries({ queryKey: ["bast"] });
      setOpen(false);
      form.reset();
    } catch {
      toast.error("Failed to create BAST document");
    }
  }

  function handleAssetSelect(assetId: string, index: number) {
    const asset = assets?.data.find((a) => a.id === assetId);
    if (!asset) return;
    form.setValue(`items.${index}.nama`, asset.nama);
    form.setValue(`items.${index}.kode`, asset.kode);
    form.setValue(`items.${index}.kondisi`, asset.kondisi === "Rusak" ? "Rusak Ringan" : "Baik");
    form.setValue(`items.${index}.keterangan`, `Category: ${asset.kategori_nama || asset.kategori_id}`);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          New BAST
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[680px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create BAST Document</DialogTitle>
          <DialogDescription>
            Berita Acara Serah Terima — Record an asset handover.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="judul"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Serah Terima Laptop ke..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="tipe"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {typeOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tanggal_serah_terima"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Handover Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="lokasi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a location..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {locations?.map((loc) => (
                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SeparatorForm />

            <div className="grid grid-cols-2 gap-4">
              {/* First Party — user picker */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="pihak_pertama"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Party (Handing Over)</FormLabel>
                      <Select
                        onValueChange={(val) => {
                          field.onChange(val);
                          const user = users?.data.find((u) => u.nama === val);
                          if (user) form.setValue("pihak_pertama_jabatan", user.jabatan);
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select person..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {users?.data.map((u) => (
                            <SelectItem key={u.id} value={u.nama}>
                              {u.nama} — {u.departemen}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pihak_pertama_jabatan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Auto-filled from user" {...field} readOnly className="bg-muted/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Second Party — user picker */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="pihak_kedua"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Second Party (Receiving)</FormLabel>
                      <Select
                        onValueChange={(val) => {
                          field.onChange(val);
                          const user = users?.data.find((u) => u.nama === val);
                          if (user) form.setValue("pihak_kedua_jabatan", user.jabatan);
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select person..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {users?.data.map((u) => (
                            <SelectItem key={u.id} value={u.nama}>
                              {u.nama} — {u.departemen}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pihak_kedua_jabatan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Auto-filled from user" {...field} readOnly className="bg-muted/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <SeparatorForm />

            {/* Items — with asset picker */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <FormLabel className="text-sm font-medium">Items</FormLabel>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ nama: "", kode: "", jumlah: 1, kondisi: "Baik", keterangan: "" })}
                  >
                    <Plus className="h-3.5 w-3.5 mr-1" />
                    Manual
                  </Button>
                </div>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="rounded-lg border p-3 space-y-3 relative">
                  <div className="absolute right-2 top-2">
                    {fields.length > 1 && (
                      <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive" onClick={() => remove(index)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>

                  {/* Asset picker */}
                  <div>
                    <FormLabel className="text-xs text-muted-foreground">Quick pick from assets</FormLabel>
                    <Select onValueChange={(val) => handleAssetSelect(val, index)}>
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Select existing asset..." />
                      </SelectTrigger>
                      <SelectContent>
                        {assets?.data.map((a) => (
                          <SelectItem key={a.id} value={a.id}>
                            {a.kode} — {a.nama}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <FormField control={form.control} name={`items.${index}.nama`} render={({ field }) => (
                      <FormItem><FormLabel className="text-xs">Item Name</FormLabel>
                        <FormControl><Input placeholder="Laptop Dell Latitude" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name={`items.${index}.kode`} render={({ field }) => (
                      <FormItem><FormLabel className="text-xs">Code</FormLabel>
                        <FormControl><Input placeholder="IT-LPT-001" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <FormField control={form.control} name={`items.${index}.jumlah`} render={({ field }) => (
                      <FormItem><FormLabel className="text-xs">Qty</FormLabel>
                        <FormControl><Input type="number" min={1} {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name={`items.${index}.kondisi`} render={({ field }) => (
                      <FormItem><FormLabel className="text-xs">Condition</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="Baik">Good</SelectItem>
                            <SelectItem value="Baru">New</SelectItem>
                            <SelectItem value="Rusak Ringan">Minor Damage</SelectItem>
                            <SelectItem value="Rusak Berat">Heavy Damage</SelectItem>
                            <SelectItem value="Lengkap">Complete</SelectItem>
                          </SelectContent>
                        </Select><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name={`items.${index}.keterangan`} render={({ field }) => (
                      <FormItem><FormLabel className="text-xs">Notes</FormLabel>
                        <FormControl><Input placeholder="Optional..." {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                </div>
              ))}
            </div>

            <FormField
              control={form.control}
              name="catatan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Additional notes for the BAST document..." className="min-h-[60px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Creating..." : "Create BAST"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function SeparatorForm() {
  return <div className="border-t border-dashed my-2" />;
}
