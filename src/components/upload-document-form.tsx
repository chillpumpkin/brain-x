import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from "./ui/form"
import { useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"
import LoadingButton from "./loading-button"

const formSchema = z.object({
    title: z.string().min(2).max(150),
  })

export default function UploadDocumentForm( {onUpload}: { onUpload: () => void }) {

  const createDocument = useMutation(api.documents.createDocument);
  const form = useForm<z.infer<typeof formSchema>>({    
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "Hello world",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {

   await createDocument({title: values.title});
   console.log("Document created, calling onUpload...");
   onUpload();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Expense report" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton isLoading={form.formState.isSubmitting} loadingText="Uploading...">
            Upload
        </LoadingButton>
      </form>
    </Form>
  )
}