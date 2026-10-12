/**
 * Interactive demo samples. Entirely fictional: generic company names and
 * reserved ".example" addresses, labelled as sample data on the page.
 */

import type { Dict } from "@/i18n";

export type DemoFlag = { row: number; text: Dict };

export type DemoSample = {
  id: string;
  label: Dict;
  from: string;
  subject: Dict;
  body: Dict;
  attachment: string;
  table: { title: Dict; columns: Dict<string[]>; rows: Dict<string[][]> };
  flags: DemoFlag[];
  approved: Dict;
};

export const demoSamples: DemoSample[] = [
  {
    id: "order",
    label: { en: "Customer order", sl: "Naročilo kupca" },
    from: "purchasing@customer-a.example",
    subject: { en: "Order 2026-1043, please confirm", sl: "Naročilo 2026-1043, prosim za potrditev" },
    body: {
      en: "Hello, please find our order attached. Delivery to our Celje warehouse. Thank you.",
      sl: "Pozdravljeni, v prilogi pošiljamo naročilo. Dostava v naše skladišče v Celju. Hvala.",
    },
    attachment: "order-2026-1043.pdf",
    table: {
      title: { en: "Draft sales order in ERP", sl: "Osnutek prodajnega naloga v ERP" },
      columns: {
        en: ["SKU", "Item", "Qty", "Price EUR"],
        sl: ["Šifra", "Artikel", "Kol.", "Cena EUR"],
      },
      rows: {
        en: [
          ["40118", "Stainless hinge 100 mm", "24", "3.80"],
          ["40122", "Door handle set", "12", "14.50"],
          ["51007", "Wood screws 4x40, box of 200", "30", "6.20"],
          ["51019", "Wall plugs 8 mm, box of 100", "40", "4.10"],
          ["62003", "Silicone sealant, clear", "18", "5.60"],
          ["62010", "Masking tape 50 m", "25", "2.30"],
        ],
        sl: [
          ["40118", "Nerjavni tečaj 100 mm", "24", "3,80"],
          ["40122", "Komplet kljuke za vrata", "12", "14,50"],
          ["51007", "Vijaki za les 4x40, škatla 200", "30", "6,20"],
          ["51019", "Zidni vložki 8 mm, škatla 100", "40", "4,10"],
          ["62003", "Silikonski kit, prozoren", "18", "5,60"],
          ["62010", "Krep trak 50 m", "25", "2,30"],
        ],
      },
    },
    flags: [
      {
        row: 2,
        text: {
          en: "Price 6.20 differs from the price list (6.90). Check before confirming.",
          sl: "Cena 6,20 odstopa od cenika (6,90). Preverite pred potrditvijo.",
        },
      },
      {
        row: 4,
        text: {
          en: "Ordered 18, only 10 in stock. Partial delivery or a later date?",
          sl: "Naročeno 18, na zalogi le 10. Delna dobava ali kasnejši rok?",
        },
      },
    ],
    approved: {
      en: "Approved. In a live system the order would now be saved in your ERP and the confirmation sent.",
      sl: "Odobreno. V pravem sistemu bi se naročilo zdaj shranilo v ERP in potrditev poslala.",
    },
  },
  {
    id: "shipment",
    label: { en: "Shipment documents", sl: "Dokumenti pošiljke" },
    from: "export@supplier-b.example",
    subject: { en: "Shipment 7781, invoice and packing list", sl: "Pošiljka 7781, račun in pakirni list" },
    body: {
      en: "Dear team, attached are the commercial invoice and packing list for shipment 7781. Pickup Thursday.",
      sl: "Pozdravljeni, v prilogi sta trgovski račun in pakirni list za pošiljko 7781. Prevzem v četrtek.",
    },
    attachment: "invoice-and-packing-list-7781.pdf",
    table: {
      title: { en: "Draft customs data for the declarant", sl: "Osnutek carinskih podatkov za deklaranta" },
      columns: { en: ["Field", "Value"], sl: ["Polje", "Vrednost"] },
      rows: {
        en: [
          ["Shipper", "Supplier B GmbH, Graz"],
          ["Consignee", "Customer C d.o.o., Celje"],
          ["Incoterm", "FCA Graz"],
          ["Packages", "12 pallets"],
          ["Gross weight (invoice)", "8,420 kg"],
          ["Gross weight (packing list)", "8,240 kg"],
          ["Commodity code", "7318 15"],
          ["Invoice value", "EUR 46,380.00"],
        ],
        sl: [
          ["Pošiljatelj", "Dobavitelj B GmbH, Gradec"],
          ["Prejemnik", "Kupec C d.o.o., Celje"],
          ["Pariteta", "FCA Gradec"],
          ["Tovorki", "12 palet"],
          ["Bruto teža (račun)", "8.420 kg"],
          ["Bruto teža (pakirni list)", "8.240 kg"],
          ["Tarifna oznaka", "7318 15"],
          ["Vrednost računa", "46.380,00 EUR"],
        ],
      },
    },
    flags: [
      {
        row: 5,
        text: {
          en: "Weight on the packing list differs from the invoice by 180 kg.",
          sl: "Teža na pakirnem listu se od računa razlikuje za 180 kg.",
        },
      },
      {
        row: 1,
        text: {
          en: "Consignee EORI number not found on the documents.",
          sl: "Številka EORI prejemnika v dokumentih ni najdena.",
        },
      },
    ],
    approved: {
      en: "Approved. In a live system the declarant would now continue from this prepared data.",
      sl: "Odobreno. V pravem sistemu bi deklarant zdaj nadaljeval s temi pripravljenimi podatki.",
    },
  },
  {
    id: "schedule",
    label: { en: "Delivery schedule change", sl: "Sprememba plana dobav" },
    from: "logistics@customer-d.example",
    subject: { en: "Updated call-off, part 4471-A", sl: "Posodobljen odpoklic, del 4471-A" },
    body: {
      en: "Please see the updated delivery schedule for part 4471-A, weeks 42 to 46.",
      sl: "V prilogi je posodobljen plan dobav za del 4471-A, tedni od 42 do 46.",
    },
    attachment: "call-off-4471-A.pdf",
    table: {
      title: { en: "Schedule changes for the planner", sl: "Spremembe plana za planerja" },
      columns: {
        en: ["Week", "Previous qty", "New qty"],
        sl: ["Teden", "Prej kol.", "Nova kol."],
      },
      rows: {
        en: [
          ["42", "1,200", "1,200"],
          ["43", "1,200", "1,440"],
          ["44", "1,000", "1,000"],
          ["45", "1,000", "0"],
          ["46", "0", "1,000"],
        ],
        sl: [
          ["42", "1.200", "1.200"],
          ["43", "1.200", "1.440"],
          ["44", "1.000", "1.000"],
          ["45", "1.000", "0"],
          ["46", "0", "1.000"],
        ],
      },
    },
    flags: [
      {
        row: 1,
        text: { en: "Week 43 quantity up by 240 pieces.", sl: "Količina v tednu 43 večja za 240 kosov." },
      },
      {
        row: 3,
        text: {
          en: "Week 45 delivery moved to week 46. Check capacity and material.",
          sl: "Dobava iz tedna 45 premaknjena v teden 46. Preverite kapaciteto in material.",
        },
      },
    ],
    approved: {
      en: "Approved. In a live system the planning data would now be updated and the confirmation drafted.",
      sl: "Odobreno. V pravem sistemu bi se planski podatki zdaj posodobili in pripravil osnutek potrditve.",
    },
  },
];
