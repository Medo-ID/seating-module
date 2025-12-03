import { UUID } from "crypto";

export type TemplateRecord = {
  id: UUID;
  name: string;
  type: "theater" | "restaurant" | "concert";
  layout_json: string;
  created_at: string;
};

export type Event = {
  id: UUID;
  name: string;
  template: UUID;
  layout_json: string;
};

export type Seat = {
  id: UUID;
  event_id: UUID;
  label: string;
  x: number;
  y: number;
  price: number;
  status: "available" | "reserved" | "blocked";
};

export type TemplateLayoutJSON = {
  rows: number;
  cols: number;
  seats: {
    label: string;
    x: number;
    y: number;
    price: number;
    status: Seat["status"];
  }[];
  createdBy: string;
  createdAt: string;
};

export type EventLayoutJSON = {
  startTime: string;
  endTime: string;
  rows: number;
  cols: number;
  seats: {
    label: string;
    x: number;
    y: number;
    price: number;
    status: Seat["status"];
  }[];
};
