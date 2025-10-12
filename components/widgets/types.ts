export interface WidgetConfig {
  id: string;
  type: string;
  style: WidgetStyle;
  content: WidgetContent;
}

export interface WidgetStyle {
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: string;
  padding?: string;
  margin?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: "left" | "center" | "right";
  width?: string;
  height?: string;
}

export interface WidgetContent {
  [key: string]: unknown;
}

export interface TextWidgetContent extends WidgetContent {
  text: string;
  heading?: string;
}

export interface ButtonWidgetContent extends WidgetContent {
  label: string;
  action: string;
  variant?: "default" | "outline" | "ghost";
}

export interface VideoWidgetContent extends WidgetContent {
  url: string;
  autoplay?: boolean;
  controls?: boolean;
}

export interface ImageWidgetContent extends WidgetContent {
  url: string;
  alt: string;
}

export interface TimerWidgetContent extends WidgetContent {
  duration: number;
  format?: "mm:ss" | "hh:mm:ss";
}

export interface ProgressWidgetContent extends WidgetContent {
  value: number;
  max: number;
  showLabel?: boolean;
}

export interface AlertWidgetContent extends WidgetContent {
  title: string;
  message: string;
  variant?: "info" | "warning" | "error" | "success";
}

export interface FAQWidgetContent extends WidgetContent {
  items: Array<{
    question: string;
    answer: string;
  }>;
}

export interface CarouselWidgetContent extends WidgetContent {
  items: Array<{
    id: string;
    content: unknown;
  }>;
  autoplay?: boolean;
  interval?: number;
}

export interface TestimonialWidgetContent extends WidgetContent {
  items: Array<{
    name: string;
    role?: string;
    avatar?: string;
    text: string;
    rating?: number;
  }>;
}

export interface CaptureWidgetContent extends WidgetContent {
  fields: Array<{
    name: string;
    type: "text" | "email" | "tel" | "number";
    label: string;
    placeholder?: string;
    required?: boolean;
  }>;
  submitLabel: string;
}

export interface SpacerWidgetContent extends WidgetContent {
  height: string;
}

export interface AudioWidgetContent extends WidgetContent {
  url: string;
  autoplay?: boolean;
  controls?: boolean;
}

export interface PriceWidgetContent extends WidgetContent {
  price: number;
  currency: string;
  period?: string;
  features?: string[];
}

export interface MetricsWidgetContent extends WidgetContent {
  metrics: Array<{
    label: string;
    value: string | number;
    icon?: string;
  }>;
}

export interface ChartWidgetContent extends WidgetContent {
  type: "bar" | "line" | "pie" | "doughnut";
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
    }>;
  };
}

export interface OptionWidgetContent extends WidgetContent {
  options: Array<{
    id: string;
    label: string;
    value: string;
  }>;
  multiple?: boolean;
}

export interface ArgumentWidgetContent extends WidgetContent {
  arguments: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
}

export interface NotificationWidgetContent extends WidgetContent {
  message: string;
  type?: "info" | "success" | "warning" | "error";
  dismissible?: boolean;
}

export interface LoadingWidgetContent extends WidgetContent {
  message?: string;
  variant?: "spinner" | "dots" | "pulse";
}

export interface WeightWidgetContent extends WidgetContent {
  value: number;
  unit: "kg" | "lb" | "g";
}

export interface HeightWidgetContent extends WidgetContent {
  value: number;
  unit: "cm" | "m" | "ft" | "in";
}
