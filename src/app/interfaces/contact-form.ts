export interface ContactForm {
    comment: string;
    id: number;
    info: InfoForm;
}

export interface InfoForm {
    name: string;
    id: number;
    invoiceAddress: InvoiceAddressForm;
    defaultPhone: DefaultPhoneForm;
    defaultEmail: DefaultEmailForm;
}

export interface InvoiceAddressForm {
    addressLine1: string;
    addressLine2: string;
    postalCode: string;
    city: string;
    id: number;
}

export interface DefaultPhoneForm {
    number: string;
    description: string;
    id: number;

}

export interface DefaultEmailForm {
    emailAddress: string;
    id: number;
}