import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle, Field, Label } from '@headlessui/react'

import { Cross2Icon } from "@radix-ui/react-icons";
import { Input } from "@headlessui/react";
import { ReactElement, useState} from "react";
import React from 'react';
import { toast } from 'sonner';
import { LoaderIcon } from './forked/icons';
import { sendGTMEvent } from '@next/third-parties/google'

const FormFields = [
    {
        id: 1,
        label: "Name",
        name: "name",
        type: "text",
        placeholder: "Miguel Acosta",
        required:true,
        pattern: undefined
    },
    {
        id: 2,
        label: "Email",
        name: "email",
        type: "email",
        placeholder: "miguel@sbsnext.com",
        pattern: undefined,
        required:true,
    },
    {
        id: 3,
        label: "Phone",
        type: "tel",
        name: "phone",
        placeholder: "551-294-4913",
    }
]

export default function ContactUs({ children }: { children: ReactElement }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleButtonClick = () => {
        setIsOpen(true);
    };

    async function onSubmit(formData: FormData) {
        setIsSubmitting(true);
       
        const jsonObject = Object.fromEntries(formData.entries());

        const msg = `
            <h2>New Contact Form Submission</h2>
            <table border="1" cellspacing="0" cellpadding="5">
                ${Object.entries(jsonObject)
                    .map(([key, value]) => `<tr><td><strong>${key}</strong></td><td>${value}</td></tr>`)
                    .join("")}
            </table>
        `;

        const response = await fetch('/api/email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: msg }),
        });
        if(response.ok)
        {
            reportConversion();
            toast.success("Sent! we'll be in touch");
            setIsOpen(false)
        }
        else
        {
            toast.error("Error submitting email")
        }
        setIsSubmitting(false);
    }

    function reportConversion() {
        sendGTMEvent({
            event: 'conversion',
            value: {
                send_to: 'AW-16881455634/9ycFCM3ZwZ8aEJKk2vE-',
            }
        });
        return false;
    }

    return (
        <>
            <div onClick={handleButtonClick}>
                {children}
            </div>


            <Dialog as="div" className="relative z-10 focus:outline-none" open={isOpen} onClose={() => setIsOpen(false)} >
                <DialogBackdrop className="fixed inset-0 bg-black/30 dark:bg-black/80" />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel
                        className="w-full max-w-md rounded-xl bg-background p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
                        <DialogTitle >
                            Get in Touch
                        </DialogTitle>
                        <Description className="mt-2 text-sm text-muted-foreground">
                            Fill out the form below, and our team will get back to you as soon as possible.
                        </Description>
                        <form className="mt-10" action={onSubmit} >
                            {
                                FormFields.map((field) => (
                                    <Field key={field.id} className="mb-[15px] text-sm dark:text-[15px] flex items-center gap-5">
                                        <Label
                                            className="w-[90px] text-right"
                                            htmlFor={field.label}
                                        >
                                            {field.label}
                                        </Label>
                                        <Input
                                            type={field.type}
                                            name={field.name}
                                            required = {field.required}
                                            placeholder={field.placeholder}
                                            pattern={field.pattern}
                                            className="inline-flex w-full flex-1 items-center justify-center leading-none  h-[35px] border 
                                        focus:outline-neutral-500 px-2.5 rounded data-[hover]:shadow data-[focus]:bg-blue-100 
                                        dark:focus:outline-neutral-950 dark:data-[focus]:bg-neutral-800"  />
                                    </Field>
                                ))
                            }
                            <div className="mt-[25px] flex justify-end">
                                <button
                                    disabled={isSubmitting}
                                    type="submit"
                                    className="inline-flex h-[35px] cta-button cursor-pointer items-center justify-center rounded bg-green4 px-[15px] font-medium leading-none text-green11 outline-none outline-offset-1 focus-visible:outline-2 focus-visible:outline-primary select-none">
                                    {isSubmitting? <div className="animate-spin">
                                                <LoaderIcon />
                                              </div>: "Submit"}
                                </button>
                            </div>

                        </form>

                        <button
                            className=" IconButton "
                            aria-label="Close"
                            onClick={() => setIsOpen(false)}
                        >
                            <Cross2Icon className="text-foreground" />
                        </button>
                    </DialogPanel>
                </div>
            </Dialog>
        </>

    );
}
