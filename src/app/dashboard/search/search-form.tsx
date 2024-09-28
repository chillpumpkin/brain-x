"use client";

import { CircleArrowUp } from "lucide-react";
import { Input, Spinner, useAccordion } from "@nextui-org/react";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useAction } from "convex/react";
import { api } from "../../../../convex/_generated/api";

const formSchema = z.object({
  search: z
    .string()
    .min(1, "Text is required")
    .max(250, "Text cannot exceed 250 characters"),
});

export default function SearchForm({
  setResults,
}: {
    setResults: (notes: typeof api.search.searchAction._returnType) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  const searchAction = useAction(api.search.searchAction);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await searchAction({ searchInput: values.search }).then((notes) => {
      setResults(notes);
    });
    form.reset();
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full flex flex-1"
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="flex-1 w-full">
              <FormControl className="w-full">
                <Input
                  {...field}
                  height={"62vh"}
                  fullWidth
                  variant="bordered"
                  endContent={
                    form.formState.isSubmitting ? ( // Show spinner when submitting
                      <Spinner size="sm" />
                    ) : (
                      <CircleArrowUp
                        onClick={form.handleSubmit(onSubmit)}
                        className="cursor-pointer"
                      />
                    )
                  }
                  size="lg"
                  className="rounded-xl"
                  placeholder="Search all over your notes and documents using vector searching"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </FormProvider>
  );
}
