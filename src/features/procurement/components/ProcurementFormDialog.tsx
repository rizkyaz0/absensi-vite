"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
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
import { procurementService } from "@/services/procurementService";
import {
  procurementFormSchema,
  type ProcurementFormValues,
} from "../schemas";
import { FileText, Plus, Trash2 } from "lucide-react";

const typeOptions = [
  { value: "pembelian", label: "Purchase" },
  { value: "sewa", label: "Lease" },
  { value: "hibah", label: "Grant" },
];

export function ProcurementFormDialog() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<ProcurementFormValues>({
    resolver: zodResolver(procurementFormSchema),
    defaultValues: {
      judul: "",
      tipe: "pembelian",
      pengaju: "",
      departemen: "",
      estimasi_biaya: 0,
      deskripsi: "",
      alasan: "",
      items: [{ nama: "", jumlah: 1, estimasi_harga: 0, spesifikasi: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  async function onSubmit(data: ProcurementFormValues) {
    try {
      await procurementService.create(data);
      toast.success("Procurement request created");
      queryClient.invalidateQueries({ queryKey: ["procurement"] });
      setOpen(false);
      form.reset();
    } catch {
      toast.error("Failed to create procurement request");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          New Request
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Procurement Request</DialogTitle>
          <DialogDescription>
            Submit a new procurement request for approval.
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
                    <Input placeholder="Pengadaan Laptop Baru 2025" {...field} />
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
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
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
                name="estimasi_biaya"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Cost (Rp)</FormLabel>
                    <FormControl>
                      <Input type="number" min={0} placeholder="50000000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="pengaju"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Requester</FormLabel>
                    <FormControl>
                      <Input placeholder="Budi Santoso" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="departemen"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Input placeholder="Teknologi Informasi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="alasan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Why is this procurement needed?"
                      className="min-h-[60px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deskripsi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Detailed description..."
                      className="min-h-[60px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Procurement Items */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <FormLabel className="text-sm font-medium">Items</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    append({
                      nama: "",
                      jumlah: 1,
                      estimasi_harga: 0,
                      spesifikasi: "",
                    })
                  }
                >
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  Add Item
                </Button>
              </div>

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="rounded-lg border p-3 space-y-3 relative"
                >
                  <div className="absolute right-2 top-2">
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-destructive"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>

                  <FormField
                    control={form.control}
                    name={`items.${index}.nama`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Item Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Laptop Dell Latitude" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                      <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name={`items.${index}.jumlah`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Quantity</FormLabel>
                          <FormControl>
                            <Input type="number" min={1} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`items.${index}.estimasi_harga`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Est. Price (Rp)</FormLabel>
                          <FormControl>
                            <Input type="number" min={0} placeholder="15000000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name={`items.${index}.spesifikasi`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Specifications</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Intel i7, 16GB RAM, 512GB SSD"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
              <FormMessage>
                {form.formState.errors.items?.root?.message ||
                  form.formState.errors.items?.message}
              </FormMessage>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting
                  ? "Submitting..."
                  : "Submit Request"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
