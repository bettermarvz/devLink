"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormProvider, useForm } from "react-hook-form";

const NewLinkForm = () => {
  const form = useForm();
  return (
    <div className="flex flex-col gap-2 w-full">
      <FormProvider {...form}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="http://" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormProvider>
    </div>
  );
};

export default NewLinkForm;
