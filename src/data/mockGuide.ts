import { BuildStep } from "@/types/build";

export const generateMockSteps = (): BuildStep[] => [
  {
    id: 1,
    title: "Prepare your workspace",
    instruction: "Clear a large, clean surface. Ground yourself by touching an unpainted metal surface to discharge static electricity.",
    warning: "Static electricity can damage components. Consider using an anti-static wrist strap.",
  },
  {
    id: 2,
    title: "Unbox and inspect components",
    instruction: "Carefully remove all components from their packaging. Check for any visible damage and verify you have all necessary cables and screws.",
  },
  {
    id: 3,
    title: "Install the CPU",
    instruction: "Open the CPU socket lever on your motherboard. Align the golden triangle on your CPU with the triangle on the socket. Gently place the CPU - do not force it. Close the lever to secure.",
    warning: "Never touch the CPU pins or socket contacts. Handle by the edges only.",
  },
  {
    id: 4,
    title: "Install RAM",
    instruction: "Open the clips on your RAM slots. Align the notch on your RAM stick with the slot. Press firmly until both clips click into place.",
  },
  {
    id: 5,
    title: "Install CPU cooler",
    instruction: "Apply a pea-sized amount of thermal paste to the center of the CPU (if not pre-applied). Mount the cooler according to its instructions and connect the fan header.",
    warning: "Ensure the cooler is seated evenly. Uneven pressure can cause overheating.",
  },
  {
    id: 6,
    title: "Prepare the case",
    instruction: "Remove both side panels from your case. Install the I/O shield that came with your motherboard by pressing it firmly into the rear opening.",
  },
  {
    id: 7,
    title: "Install motherboard standoffs",
    instruction: "Screw the brass standoffs into your case that match your motherboard's mounting holes. Most ATX boards use 9 standoffs.",
  },
  {
    id: 8,
    title: "Mount the motherboard",
    instruction: "Lower the motherboard into the case at an angle, aligning the rear ports with the I/O Shield. Secure with the provided screws - don't overtighten.",
  },
  {
    id: 9,
    title: "Install storage drives",
    instruction: "Mount your SSD or HDD in the appropriate bay or bracket. Connect the SATA data cable to the motherboard and power cable from your PSU.",
  },
  {
    id: 10,
    title: "Install the power supply",
    instruction: "Slide the PSU into its bay at the bottom or top of the case. Secure with screws. Route cables through the case's cable management holes.",
  },
  {
    id: 11,
    title: "Connect power cables",
    instruction: "Connect the 24-pin ATX cable to the motherboard. Connect the 8-pin CPU power cable near the top of the motherboard.",
    warning: "Ensure cables click firmly into place. Loose connections can prevent boot.",
  },
  {
    id: 12,
    title: "Install the GPU",
    instruction: "Remove the necessary PCIe slot covers from the case. Insert the GPU into the top PCIe x16 slot until it clicks. Secure with screws and connect power cables if required.",
  },
  {
    id: 13,
    title: "Connect front panel cables",
    instruction: "Connect the case's power button, reset button, and LED cables to the motherboard's front panel header. Check your motherboard manual for the correct pins.",
  },
  {
    id: 14,
    title: "Final check and first boot",
    instruction: "Double-check all connections. Ensure no cables are blocking fans. Replace side panels, connect monitor, keyboard, and power. Press the power button.",
    warning: "If the system doesn't boot, don't panic. Recheck power connections and RAM seating.",
  },
];
