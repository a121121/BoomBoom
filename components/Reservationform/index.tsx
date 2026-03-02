"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

// ─── Constants ────────────────────────────────────────────────────────────────

const dietaryOptions = [
    { id: "halal", label: "Halal" },
    { id: "no-nuts", label: "No Nuts" },
    { id: "kosher", label: "Kosher" },
    { id: "vegetarian", label: "Vegetarian" },
    { id: "vegan", label: "Vegan" },
    { id: "gluten-free", label: "Gluten Free" },
    { id: "dairy-free", label: "Dairy Free" },
];

const timeSlots = [
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30",
];

// ─── Schema ───────────────────────────────────────────────────────────────────

const formSchema = z
    .object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        phone: z
            .string()
            .min(7, "Enter a valid phone number")
            .regex(/^[+\d\s\-()]+$/, "Enter a valid phone number"),
        email: z.string().email("Enter a valid email address"),
        heads: z.string().min(1, "Please select number of guests"),
        date: z.date().or(z.undefined()),
        time: z.string().min(1, "Please select a time"),
        dietary: z.array(z.string()),
        decor: z.enum(["none", "birthday", "anniversary", "other"]),
        decorNote: z.string().optional(),
    })
    .refine((data) => !!data.date, {
        message: "Please select a date",
        path: ["date"],
    })
    .refine(
        (data) =>
            data.decor !== "other" ||
            (data.decorNote && data.decorNote.trim().length > 0),
        {
            message: "Please specify the occasion",
            path: ["decorNote"],
        }
    );

type FormValues = z.infer<typeof formSchema>;

// ─── Component ────────────────────────────────────────────────────────────────

export default function ReservationForm() {
    const [submitted, setSubmitted] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            heads: "",
            date: undefined,
            time: "",
            dietary: [],
            decor: "none",
            decorNote: "",
        },
    });

    const decor = form.watch("decor");

    function onSubmit(data: FormValues) {
        console.log("Reservation data:", data);
        setSubmitted(true);
    }

    // ─── Confirmation screen ──────────────────────────────────────────────────
    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-6 text-center px-4 animate-in fade-in duration-700">
                <div className="w-16 h-16 rounded-full bg-foreground/5 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-foreground" />
                </div>
                <div className="space-y-3">
                    <h2 className="font-display text-2xl text-foreground tracking-tight">
                        Reservation Received
                    </h2>
                    <p className="text-muted-foreground text-base max-w-sm leading-relaxed">
                        Thank you for submitting your reservation, we will confirm you
                        shortly.
                    </p>
                </div>
            </div>
        );
    }

    // ─── Form ─────────────────────────────────────────────────────────────────
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                {/* Name */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-foreground font-medium tracking-wide text-xs uppercase">
                                Full Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Jane Smith"
                                    className="border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-foreground/20 h-11"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Phone */}
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-foreground font-medium tracking-wide text-xs uppercase">
                                Phone Number
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="tel"
                                    placeholder="+44 7700 900000"
                                    className="border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-foreground/20 h-11"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-foreground font-medium tracking-wide text-xs uppercase">
                                Email Address
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="jane@example.com"
                                    className="border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-foreground/20 h-11"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Number of Guests */}
                <FormField
                    control={form.control}
                    name="heads"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-foreground font-medium tracking-wide text-xs uppercase">
                                Number of Guests
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="border-border bg-background text-foreground h-11 focus:ring-foreground/20">
                                        <SelectValue placeholder="Select party size" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                                        <SelectItem key={n} value={String(n)}>
                                            {n} {n === 1 ? "Guest" : "Guests"}
                                        </SelectItem>
                                    ))}
                                    <SelectItem value="11+">11+ Guests (large party)</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Date & Time — side by side */}
                <div className="grid grid-cols-2 gap-4">

                    {/* Date */}
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel className="text-foreground font-medium tracking-wide text-xs uppercase">
                                    Date
                                </FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "h-11 w-full justify-start text-left font-normal border-border bg-background hover:bg-background focus-visible:ring-foreground/20",
                                                    !field.value && "text-muted-foreground/50"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4 opacity-50 shrink-0" />
                                                {field.value
                                                    ? format(field.value, "dd MMM yyyy")
                                                    : "Pick a date"}
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < new Date(new Date().setHours(0, 0, 0, 0))
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Time */}
                    <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel className="text-foreground font-medium tracking-wide text-xs uppercase">
                                    Time
                                </FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="border-border bg-background text-foreground h-11 focus:ring-foreground/20">
                                            <SelectValue placeholder="Select time" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="_lunch" disabled className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                                            — Lunch —
                                        </SelectItem>
                                        {timeSlots.slice(0, 6).map((t) => (
                                            <SelectItem key={t} value={t}>{t}</SelectItem>
                                        ))}
                                        <SelectItem value="_dinner" disabled className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                                            — Dinner —
                                        </SelectItem>
                                        {timeSlots.slice(6).map((t) => (
                                            <SelectItem key={t} value={t}>{t}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>

                {/* Dietary Requirements */}
                <FormField
                    control={form.control}
                    name="dietary"
                    render={() => (
                        <FormItem>
                            <FormLabel className="text-foreground font-medium tracking-wide text-xs uppercase">
                                Dietary Requirements
                            </FormLabel>
                            <div className="grid grid-cols-2 gap-3 mt-2">
                                {dietaryOptions.map((option) => (
                                    <FormField
                                        key={option.id}
                                        control={form.control}
                                        name="dietary"
                                        render={({ field }) => (
                                            <FormItem className="flex items-center space-x-2 space-y-0">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(option.id)}
                                                        onCheckedChange={(checked) => {
                                                            const current = field.value ?? [];
                                                            field.onChange(
                                                                checked
                                                                    ? [...current, option.id]
                                                                    : current.filter((v) => v !== option.id)
                                                            );
                                                        }}
                                                        className="border-border data-[state=checked]:bg-foreground data-[state=checked]:border-foreground"
                                                    />
                                                </FormControl>
                                                <Label className="text-muted-foreground font-normal cursor-pointer text-sm">
                                                    {option.label}
                                                </Label>
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Special Occasion */}
                <FormField
                    control={form.control}
                    name="decor"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-foreground font-medium tracking-wide text-xs uppercase">
                                Special Occasion?
                            </FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="grid grid-cols-2 gap-3 mt-2"
                                >
                                    {[
                                        { value: "none", label: "None" },
                                        { value: "birthday", label: "Birthday" },
                                        { value: "anniversary", label: "Anniversary" },
                                        { value: "other", label: "Other" },
                                    ].map((opt) => (
                                        <div key={opt.value} className="flex items-center space-x-2">
                                            <RadioGroupItem
                                                value={opt.value}
                                                id={`decor-${opt.value}`}
                                                className="border-border text-foreground"
                                            />
                                            <Label
                                                htmlFor={`decor-${opt.value}`}
                                                className="text-muted-foreground font-normal cursor-pointer text-sm"
                                            >
                                                {opt.label}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Decor Note — shown when "other" selected */}
                {decor === "other" && (
                    <FormField
                        control={form.control}
                        name="decorNote"
                        render={({ field }) => (
                            <FormItem className="animate-in fade-in slide-in-from-top-2 duration-300">
                                <FormLabel className="text-foreground font-medium tracking-wide text-xs uppercase">
                                    Please Specify
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Tell us about your occasion..."
                                        className="border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-foreground/20 resize-none"
                                        rows={3}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                <Button
                    type="submit"
                    className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-medium tracking-widest text-xs uppercase transition-all duration-300"
                >
                    Reserve Now
                </Button>
            </form>
        </Form>
    );
}