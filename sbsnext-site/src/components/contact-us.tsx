'use client'
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle, Field, Label } from '@headlessui/react'

import { Cross2Icon } from "@radix-ui/react-icons";
import { Input, Textarea } from "@headlessui/react";
import { ReactElement, useEffect, useState} from "react";
import React from 'react';
import { toast } from 'sonner';
import { LoaderIcon } from './forked/icons';
import { usePathname } from "next/navigation";

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
        label: "Organization",
        type: "text",
        name: "org",
        placeholder: "SBS Next LLC",
    },
    {
        id: 3,
        label: "Email",
        name: "email",
        type: "email",
        placeholder: "miguel@sbsnext.com",
        pattern: undefined,
        required:true,
    },
    {
        id: 4,
        label: "Phone",
        type: "tel",
        name: "phone",
        placeholder: "551-294-4913",
        required:false
    },
    {
        id: 5,
        label: "Message",
        type: "text",
        name: "message",
        placeholder: "Message",
    }
    
];

type FormField = (typeof FormFields)[number];
type ContactState = "closed" | "contactUsClicked" | "tellUsWhoYouAre";

export default function ContactUs({ children }: { children: ReactElement }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [contactState, setContactState] = useState<ContactState>("closed");
    const [formSubmitted, setFormSubmitted] = usePersistentState("contactFormSubmitted", "false");
    const pathname = usePathname(); // Get current path

    useEffect(() => {
        if (pathname.startsWith("/chat") && formSubmitted !== "true") {
            setIsOpen(true);
            setContactState("tellUsWhoYouAre");
        }
    }, [pathname]);

    
    const handleButtonClick = () => {
        setContactState("contactUsClicked");
        setIsOpen(true);
    };

    const handleCloseDialog = () => {
        setContactState("closed");
        setIsOpen(false);
    };

    async function onSubmit(formData: FormData) {
        setIsSubmitting(true);
       
        const jsonObject = Object.fromEntries(formData.entries());

        const response = await fetch('/api/contact-us', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonObject),
        });
        if(response.ok)
        {
            reportConversion();
            toast.success("Sent! we'll be in touch");
            setFormSubmitted("true")
            handleCloseDialog();
        }
        else
        {
            toast.error("Error submitting email")
        }
        setIsSubmitting(false);
    }

    
    function reportConversion() {
        window.gtag_report_conversion();

    }

    return (
        <>
            <div onClick={handleButtonClick}>
                {children}
            </div>


            <Dialog as="div" className="relative z-10 focus:outline-none" open={isOpen} onClose={() => handleCloseDialog()} >
                <DialogBackdrop className="fixed inset-0 bg-black/30 dark:bg-black/80" />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel
                        className="w-full max-w-md rounded-xl bg-background p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
                       <DialogTitle>
                            {contactState === "contactUsClicked" && "Get in Touch"}
                            {contactState === "tellUsWhoYouAre" && "Tell Us Who You Are!"}
                        </DialogTitle>
                        <Description className="mt-2 text-sm text-muted-foreground">
                            {contactState === "contactUsClicked" && "Fill out the form below, and our team will get back to you as soon as possible."}
                            {contactState === "tellUsWhoYouAre" && "Optional: Let us know a little about you. "} 
                        </Description>
                        <Description className="mt-2 text-sm text-muted-foreground">
                            Rest assured, we won&rsquo;t send you any promotional emails.
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
                                        <FieldInput field={field} />
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

function FieldInput({field}: {field: FormField}) {
    const className = `inline-flex w-full flex-1 items-center justify-center leading-none border 
        focus:outline-neutral-500 px-2.5 rounded data-[hover]:shadow data-[focus]:bg-blue-100 py-1.5
        dark:focus:outline-neutral-950 dark:data-[focus]:bg-neutral-800`;

    if (field.name === "message") {
        return (
            <Textarea
                name={field.name}
                required = {field.required}
                placeholder={field.placeholder}
                className={className }
                rows={4} />
        );
    }
    return (
      <Input
            type={field.type}
            name={field.name}
            required = {field.required}
            placeholder={field.placeholder}
            pattern={field.pattern}
            className={className}
            height="35px" />
    );
  }

export function usePersistentState(key: string, defaultValue: string) {
    const [value, setValue] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem(key) || defaultValue;
        }
        return defaultValue;
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem(key, value);
        }
    }, [value]);

    return [value, setValue] as const;
}