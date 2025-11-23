"use client";

import { IconPlus } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useQueryState } from "nuqs";
import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  XAxis,
} from "recharts";
import { v4 as uuidv4 } from "uuid";
import { CommandMenu } from "@/components/command-menu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfile } from "@/components/user-profile";

const chartData = [
  { browser: "safari", visitors: 1960, fill: "var(--color-safari)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-3)",
  },
  desktop: {
    label: "Desktop",
    color: "var(--chart-2)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const chartData2 = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
  { date: "2024-05-01", desktop: 165, mobile: 220 },
  { date: "2024-05-02", desktop: 293, mobile: 310 },
  { date: "2024-05-03", desktop: 247, mobile: 190 },
  { date: "2024-05-04", desktop: 385, mobile: 420 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-06", desktop: 498, mobile: 520 },
  { date: "2024-05-07", desktop: 388, mobile: 300 },
  { date: "2024-05-08", desktop: 149, mobile: 210 },
  { date: "2024-05-09", desktop: 227, mobile: 180 },
  { date: "2024-05-10", desktop: 293, mobile: 330 },
  { date: "2024-05-11", desktop: 335, mobile: 270 },
  { date: "2024-05-12", desktop: 197, mobile: 240 },
  { date: "2024-05-13", desktop: 197, mobile: 160 },
  { date: "2024-05-14", desktop: 448, mobile: 490 },
  { date: "2024-05-15", desktop: 473, mobile: 380 },
  { date: "2024-05-16", desktop: 338, mobile: 400 },
  { date: "2024-05-17", desktop: 499, mobile: 420 },
  { date: "2024-05-18", desktop: 315, mobile: 350 },
  { date: "2024-05-19", desktop: 235, mobile: 180 },
  { date: "2024-05-20", desktop: 177, mobile: 230 },
  { date: "2024-05-21", desktop: 82, mobile: 140 },
  { date: "2024-05-22", desktop: 81, mobile: 120 },
  { date: "2024-05-23", desktop: 252, mobile: 290 },
  { date: "2024-05-24", desktop: 294, mobile: 220 },
  { date: "2024-05-25", desktop: 201, mobile: 250 },
  { date: "2024-05-26", desktop: 213, mobile: 170 },
  { date: "2024-05-27", desktop: 420, mobile: 460 },
  { date: "2024-05-28", desktop: 233, mobile: 190 },
  { date: "2024-05-29", desktop: 78, mobile: 130 },
  { date: "2024-05-30", desktop: 340, mobile: 280 },
];

export default function DashboardPage() {
  const router = useRouter();
  const [selectedFunnel, setSelectedFunnel] = React.useState("funil-1");
  const [activeTab, setActiveTab] = useQueryState("tab", {
    defaultValue: "funis",
  });
  const [timeRange, _] = React.useState("90d");

  const filteredData = chartData2.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  const handleCreateFunnel = () => {
    const newFunnelId = uuidv4();
    router.push(`/dashboard/funnel/${newFunnelId}`);
  };

  const funnels = [
    { id: "funil-1", name: "Funil de Vendas - Produto A" },
    { id: "funil-2", name: "Funil de Leads - Serviço B" },
    { id: "funil-3", name: "Funil de Conversão - Landing Page" },
  ];

  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex flex-col flex-1"
      >
        <header>
          <div className="w-full mx-auto px-6 flex justify-between border-b min-h-12 max-h-12">
            <div className="flex items-center justify-between gap-4">
              <Image
                src={
                  mounted && theme === "dark"
                    ? "/f.svg"
                    : "/f-black.svg"
                }
                alt="funilead"
                width={32}
                height={32}
                className="w-6 flex-shrink-0"
                priority
              />
              <div className="w-[0.5px] bg-muted h-4" />
              <TabsList className="text-foreground h-auto gap-2 rounded-none bg-transparent px-0 py-1">
                <TabsTrigger
                  value="funis"
                  className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-2 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Funis
                </TabsTrigger>
                <TabsTrigger
                  value="resultados"
                  className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-2   after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Resultados
                </TabsTrigger>
              </TabsList>
            </div>
            <div className="my-1 space-x-4 flex justify-center items-center">
              <CommandMenu />
              <div className="w-[0.5px] bg-muted h-4" />
              <UserProfile />
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col">
          <TabsContent
            value="funis"
            className="flex-1 m-0 flex flex-col items-center justify-center px-6"
          >
            <Button onClick={handleCreateFunnel}>
              <IconPlus />
              Novo Funil
            </Button>
          </TabsContent>

          <TabsContent value="resultados" className="flex-1 m-0 p-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl">Resultados do Funil</h2>
                <Select
                  value={selectedFunnel}
                  onValueChange={setSelectedFunnel}
                >
                  <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder="Selecione um funil" />
                  </SelectTrigger>
                  <SelectContent>
                    {funnels.map((funnel) => (
                      <SelectItem key={funnel.id} value={funnel.id}>
                        {funnel.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-start items-center space-x-4">
                <Card className="flex flex-col max-w-[300px] max-h-[300px] min-w-[300px] min-h-[300px]">
                  <CardHeader className="items-center pb-0">
                    <CardTitle>Visitantes</CardTitle>
                    <CardDescription>
                      Visitantes que acessaram o funil
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pb-0">
                    <ChartContainer
                      config={chartConfig}
                      className="mx-auto aspect-square w-full h-[200px]"
                    >
                      <RadialBarChart
                        data={chartData}
                        width={200}
                        height={200}
                        endAngle={100}
                        innerRadius={60}
                        outerRadius={100}
                      >
                        <PolarGrid
                          gridType="circle"
                          radialLines={false}
                          stroke="none"
                          className="first:fill-muted last:fill-background"
                          polarRadius={[66, 54]}
                        />
                        <RadialBar dataKey="visitors" background />
                        <PolarRadiusAxis
                          tick={false}
                          tickLine={false}
                          axisLine={false}
                        >
                          <Label
                            content={({ viewBox }) => {
                              if (
                                viewBox &&
                                "cx" in viewBox &&
                                "cy" in viewBox
                              ) {
                                return (
                                  <text
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                  >
                                    <tspan
                                      x={viewBox.cx}
                                      y={viewBox.cy}
                                      className="fill-foreground text-2xl font-bold"
                                    >
                                      {chartData[0].visitors.toLocaleString()}
                                    </tspan>
                                    <tspan
                                      x={viewBox.cx}
                                      y={(viewBox.cy || 0) + 20}
                                      className="fill-muted-foreground text-sm"
                                    >
                                      Visitantes
                                    </tspan>
                                  </text>
                                );
                              }
                            }}
                          />
                        </PolarRadiusAxis>
                      </RadialBarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card className="flex flex-col max-w-[300px] max-h-[300px] min-w-[300px] min-h-[300px]">
                  <CardHeader className="items-center pb-0">
                    <CardTitle>Taxa de conversão</CardTitle>
                    <CardDescription className="">
                      Média de conversão do funil
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pb-0">
                    <ChartContainer
                      config={chartConfig}
                      className="mx-auto aspect-square w-full h-[200px]"
                    >
                      <RadialBarChart
                        data={chartData}
                        width={200}
                        height={200}
                        endAngle={100}
                        innerRadius={60}
                        outerRadius={100}
                      >
                        <PolarGrid
                          gridType="circle"
                          radialLines={false}
                          stroke="none"
                          className="first:fill-muted last:fill-background"
                          polarRadius={[66, 54]}
                        />
                        <RadialBar dataKey="visitors" background />
                        <PolarRadiusAxis
                          tick={false}
                          tickLine={false}
                          axisLine={false}
                        >
                          <Label
                            content={({ viewBox }) => {
                              if (
                                viewBox &&
                                "cx" in viewBox &&
                                "cy" in viewBox
                              ) {
                                return (
                                  <text
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                  >
                                    <tspan
                                      x={viewBox.cx}
                                      y={viewBox.cy}
                                      className="fill-foreground text-2xl font-bold"
                                    >
                                      {chartData[0].visitors.toLocaleString()}
                                    </tspan>
                                    <tspan
                                      x={viewBox.cx}
                                      y={(viewBox.cy || 0) + 20}
                                      className="fill-muted-foreground text-sm"
                                    >
                                      Visitantes
                                    </tspan>
                                  </text>
                                );
                              }
                            }}
                          />
                        </PolarRadiusAxis>
                      </RadialBarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card className="flex flex-col max-w-[300px] max-h-[300px] min-w-[300px] min-h-[300px]">
                  <CardHeader className="items-center pb-0">
                    <CardTitle>Fluxos Finalizados</CardTitle>
                    <CardDescription>
                      Usuários que chegaram até a última etapa.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pb-0">
                    <ChartContainer
                      config={chartConfig}
                      className="mx-auto aspect-square w-full h-[200px]"
                    >
                      <RadialBarChart
                        data={chartData}
                        width={200}
                        height={200}
                        endAngle={100}
                        innerRadius={60}
                        outerRadius={100}
                      >
                        <PolarGrid
                          gridType="circle"
                          radialLines={false}
                          stroke="none"
                          className="first:fill-muted last:fill-background"
                          polarRadius={[66, 54]}
                        />
                        <RadialBar dataKey="visitors" background />
                        <PolarRadiusAxis
                          tick={false}
                          tickLine={false}
                          axisLine={false}
                        >
                          <Label
                            content={({ viewBox }) => {
                              if (
                                viewBox &&
                                "cx" in viewBox &&
                                "cy" in viewBox
                              ) {
                                return (
                                  <text
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                  >
                                    <tspan
                                      x={viewBox.cx}
                                      y={viewBox.cy}
                                      className="fill-foreground text-2xl font-bold"
                                    >
                                      {chartData[0].visitors.toLocaleString()}
                                    </tspan>
                                    <tspan
                                      x={viewBox.cx}
                                      y={(viewBox.cy || 0) + 20}
                                      className="fill-muted-foreground text-sm"
                                    >
                                      Visitantes
                                    </tspan>
                                  </text>
                                );
                              }
                            }}
                          />
                        </PolarRadiusAxis>
                      </RadialBarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card className="flex-1 flex-col  max-h-[300px] min-h-[300px]">
                  <CardHeader className="items-center pb-0">
                    <CardTitle>Fluxos Finalizados</CardTitle>
                    <CardDescription>
                      Usuários que chegaram até a última etapa.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pb-0">
                    <ChartContainer
                      config={chartConfig}
                      className="aspect-auto h-[200px] w-full"
                    >
                      <AreaChart data={filteredData}>
                        <defs>
                          <linearGradient
                            id="fillDesktop"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="var(--color-desktop)"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="var(--color-desktop)"
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                          <linearGradient
                            id="fillMobile"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="var(--color-mobile)"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="var(--color-mobile)"
                              stopOpacity={0.1}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="date"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          minTickGap={32}
                          tickFormatter={(value) => {
                            const date = new Date(value);
                            return date.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            });
                          }}
                        />
                        <ChartTooltip
                          cursor={false}
                          content={
                            <ChartTooltipContent
                              labelFormatter={(value) => {
                                return new Date(value).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                  },
                                );
                              }}
                              indicator="dot"
                            />
                          }
                        />
                        <Area
                          dataKey="mobile"
                          type="natural"
                          fill="url(#fillMobile)"
                          stroke="var(--color-mobile)"
                          stackId="a"
                        />
                        <Area
                          dataKey="desktop"
                          type="natural"
                          fill="url(#fillDesktop)"
                          stroke="var(--color-desktop)"
                          stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                      </AreaChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </main>
      </Tabs>
    </div>
  );
}
