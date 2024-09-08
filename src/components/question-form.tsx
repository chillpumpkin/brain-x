"use client";

import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { CircleArrowUp } from "lucide-react";
import { Input } from "@nextui-org/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "./ui/form";

const formSchema = z.object({
  text: z.string().min(1).max(1000),
});

export default function QuestionForm({
  documentId,
}: {
  documentId: Id<"documents">;
}) {
  const askQuestion = useAction(api.documents.askQuestion);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const text = values.text;
    await askQuestion({ question: text, documentId }).then(console.log);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-1">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <div className="w-full">
                  <Input
                    {...field} 
                    height={"62vh"}
                    variant="bordered"
                    endContent={<CircleArrowUp />}
                    className="rounded-xl"
                    placeholder="Ask any question about your document"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
