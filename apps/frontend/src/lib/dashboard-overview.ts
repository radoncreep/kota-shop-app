export type Overview = {
  value: number | string
  name: string
  iconPath: string
}

export const DashboardOverview: Overview[] = [
  {
    value: 75,
    name: "Total Orders",
    iconPath: "/icons/total-orders.svg",
  },
  {
    value: 50,
    name: "Total Deliveries",
    iconPath: "/icons/total-delivered.png",
  },
  {
    value: "R 70",
    name: "Total Revenue",
    iconPath: "/icons/total-revenue.png",
  },
  {
    value: 0,
    name: "Total Returns",
    iconPath: "/icons/total-cancelled.png",
  },
]
