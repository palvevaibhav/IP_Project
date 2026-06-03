// elements.jsx

// =========================
// NODES
// =========================

export const nodes = {
  "MUMBRLB1CSR001": {
    "id": "MUMBRLB1CSR001",
    "label": "MUMBRLB1CSR001",
    "hostname": "MUMBRLB1CSR001",
    "platform": "Cisco ASR9000",
    "loopbackIP": "10.1.1.1",
    "role": "CSR",
    "status": "UP",
    "level": "L3"
  },
  "MUMBRLB2CCR001": {
    "id": "MUMBRLB2CCR001",
    "label": "MUMBRLB2CCR001",
    "hostname": "MUMBRLB2CCR001",
    "platform": "Juniper MX960",
    "loopbackIP": "10.1.1.2",
    "role": "CCR",
    "status": "UP",
    "level": "L2"
  },
  "MUMBRLB1IAR001": {
    "label": "MUMBRLB1IAR001",
    "hostname": "MUMBRLB1IAR001",
    "platform": "Cisco NCS5500",
    "loopbackIP": "10.1.1.3",
    "role": "IAR",
    "status": "UP",
    "level": "L4"
  },
  "MUMBRLB1CCR001": {
    "id": "MUMBRLB1CCR001",
    "label": "MUMBRLB1CCR001",
    "hostname": "MUMBRLB1CCR001",
    "platform": "Juniper MX480",
    "loopbackIP": "10.1.1.4",
    "role": "CCR",
    "status": "DOWN",
    "level": "L2"
  },
  "BGLRRLABCCR001": {
    "id": "BGLRRLABCCR001",
    "label": "BGLRRLABCCR001",
    "hostname": "BGLRRLABCCR001",
    "platform": "Cisco ASR9904",
    "loopbackIP": "10.1.1.5",
    "role": "CCR",
    "status": "UP",
    "level": "L2"
  },
  "MUMBRLB1CSR002": {
    "id": "MUMBRLB1CSR002",
    "label": "MUMBRLB1CSR002",
    "hostname": "MUMBRLB1CSR002",
    "platform": "Nokia 7750 SR",
    "loopbackIP": "10.1.1.6",
    "role": "CSR",
    "status": "UP",
    "level": "L3"
  },
  "NVMBNVMBICR001": {
    "id": "NVMBNVMBICR001",
    "label": "NVMBNVMBICR001",
    "hostname": "NVMBNVMBICR001",
    "platform": "Cisco NCS540",
    "loopbackIP": "10.1.1.7",
    "role": "ICR",
    "status": "UP",
    "level": "L5"
  },
  "BGLRRLABCSR002": {
    "id": "BGLRRLABCSR002",
    "label": "BGLRRLABCSR002",
    "hostname": "BGLRRLABCSR002",
    "platform": "Juniper ACX710",
    "loopbackIP": "10.1.1.8",
    "role": "CSR",
    "status": "MAINTENANCE",
    "level": "L3"
  },
  "BGLRRLABVRR002": {
    "id": "BGLRRLABVRR002",
    "label": "BGLRRLABVRR002",
    "hostname": "BGLRRLABVRR002",
    "platform": "Cisco ISR4451",
    "loopbackIP": "10.1.1.9",
    "role": "VRR",
    "status": "UP",
    "level": "L6"
  },
  "MUMBBIDCICR001": {
    "id": "MUMBBIDCICR001",
    "label": "MUMBBIDCICR001",
    "hostname": "MUMBBIDCICR001",
    "platform": "Nokia 7250 IXR",
    "loopbackIP": "10.1.1.10",
    "role": "ICR",
    "status": "UP",
    "level": "L5"
  },
  "MUMBMUMBISR001": {
    "id": "MUMBMUMBISR001",
    "label": "MUMBMUMBISR001",
    "hostname": "MUMBMUMBISR001",
    "platform": "Cisco Catalyst 9500",
    "loopbackIP": "10.1.1.11",
    "role": "ISR",
    "status": "DOWN",
    "level": "L4"
  },
  "MUMBBIDCICR002": {
    "id": "MUMBBIDCICR002",
    "label": "MUMBBIDCICR002",
    "hostname": "MUMBBIDCICR002",
    "platform": "Juniper MX204",
    "loopbackIP": "10.1.1.12",
    "role": "ICR",
    "status": "UP",
    "level": "L5"
  }
}


// =========================
// EDGES (IS-IS + MPLS + BGP)
// =========================

export const edges = [
  {
    "source": "MUMBRLB1CSR001",
    "target": "MUMBRLB1CCR001",
    "interface": "BE1"
  },
  {
    "source": "MUMBRLB1CSR001",
    "target": "MUMBRLB2CCR001",
    "interface": "BE2"
  },
  {
    "source": "MUMBRLB1CSR001",
    "target": "MUMBRLB1CSR002",
    "interface": "BE7"
  },
  {
    "source": "MUMBRLB1CSR001",
    "target": "MUMBRLB1URR001",
    "interface": "Te0/4/0/9"
  },
  {
    "source": "MUMBRLB1CSR001",
    "target": "MUMBRLB1CRR001",
    "interface": "Te0/4/0/11"
  },
  {
    "source": "MUMBRLB1CSR001",
    "target": "MUMBRLB1IRR001",

    "interface": "Te0/4/0/7"
  },
  {
    "source": "MUMBRLB2CCR001",
    "target": "MUMBRLB1CCR001",

    "interface": "BE912"
  },
  {
    "source": "MUMBRLB2CCR001",
    "target": "MUMBRLB1AAR001",

    "interface": "BE703"
  },
  {
    "source": "MUMBRLB2CCR001",
    "target": "MUMBRLB2AAR001",
    "interface": "BE704"
  },
  {
    "source": "MUMBRLB2CCR001",
    "target": "MUMBRLB1IAR002",
    "interface": "BE222"
  },
  {
    "source": "MUMBRLB2CCR001",
    "target": "MUMBRLB1CSR002",
    "interface": "BE5"
  },
  {
    "source": "MUMBRLB2CCR001",
    "target": "MUMBRLB1IAR001",
    "interface": "BE111"
  },
  {
    "source": "MUMBRLB2CCR001",
    "target": "MUMBRLB1CSR001",
    "interface": "BE4"
  },
  {
    "source": "MUMBRLB2CCR001",
    "target": "BGLRRLABCCR002",
    "interface": "BE801"
  },
  {
    "source": "MUMBRLB2CCR001",
    "target": "MUMBRLB1CSR005",
    "interface": "Te0/1/0/5"
  },
  {
    "source": "MUMBRLB2CCR001",
    "target": "MUMBRLB1CSR006",
    "interface": "Te0/1/0/7"
  },
  {
    "source": "MUMBRLB2CCR001",
    "target": "MUMBRLB1IAR001",
    "interface": "BE111.5"
  },
  {
    "source": "MUMBRLB2CCR001",
    "target": "BGLRRLABCCR002",
    "interface": "BE801.5"
  },
  {
    "source": "MUMBRLB1IAR001",
    "target": "MUMBRLB1CCR001",
    "interface": "BE1"
  },
  {
    "source": "MUMBRLB1IAR001",
    "target": "MUMBRLB2CCR001",
    "interface": "BE111"
  },
  {
    "source": "MUMBRLB1IAR001",
    "target": "MUMBMUMBICR001",
    "interface": "BE200"
  },
  {
    "source": "MUMBRLB1IAR001",
    "target": "MUMBMUMBWRR001",
    "interface": "Te0/1/0/2"
  },
  {
    "source": "MUMBRLB1IAR001",
    "target": "NVMBNVMBICR001",
    "interface": "BE201"
  },
  {
    "source": "MUMBRLB1IAR001",
    "target": "MUMBRLB1CCR001",
    "interface": "BE1.5"
  },
  {
    "source": "MUMBRLB1IAR001",
    "target": "MUMBRLB2CCR001",
    "interface": "BE111.5"
  },
  {
    "source": "MUMBRLB1CCR001",
    "target": "MUMBRLB1AAR001",
    "interface": "BE701"
  },
  {
    "source": "MUMBRLB1CCR001",
    "target": "MUMBRLB2CCR001",
    "interface": "BE912"
  },
  {
    "source": "MUMBRLB1CCR001",
    "target": "MUMBRLB2AAR001",
    "interface": "BE702"
  },
  {
    "source": "MUMBRLB1CCR001",
    "target": "MUMBRLB1CSR002",
    "interface": "BE2"
  },
  {
    "source": "MUMBRLB1CCR001",
    "target": "MUMBRLB1IAR001",
    "interface": "BE3"
  },
  {
    "source": "MUMBRLB1CCR001",
    "target": "MUMBRLB1CSR001",
    "interface": "BE1"
  },
  {
    "source": "MUMBRLB1CCR001",
    "target": "BGLRRLABCCR001",
    "interface": "BE911"
  },
  {
    "source": "MUMBRLB1CCR001",
    "target": "MUMBRLB1CSR005",
    "interface": "Te0/2/0/0"
  },
  {
    "source": "MUMBRLB1CCR001",
    "target": "MUMBRLB1CSR006",
    "interface": "Te0/2/0/1"
  },
  {
    "source": "MUMBRLB1CCR001",
    "target": "MUMBRLB1IAR001",
    "interface": "BE3.5"
  },
  {
    "source": "MUMBRLB1CCR001",
    "target": "BGLRRLABCCR001",
    "interface": "BE911.5"
  },
  {
    "source": "BGLRRLABCCR001",
    "target": "BGLRRLABAAR003",
    "interface": "BE801"
  },
  {
    "source": "BGLRRLABCCR001",
    "target": "BGLRRLABAAR002",

    "interface": "BE702"
  },
  {
    "source": "BGLRRLABCCR001",
    "target": "BGLRRLABAAR001",

    "interface": "BE701"
  },
  {
    "source": "BGLRRLABCCR001",
    "target": "MUMBRLB1CCR001",
    "interface": "BE911"
  },
  {
    "source": "BGLRRLABCCR001",
    "target": "MUMBMUMBISR001",
    "interface": "BE200"
  },
  {
    "source": "BGLRRLABCCR001",
    "target": "BGLRRLABCSR002",
    "interface": "BE5"
  },
  {
    "source": "BGLRRLABCCR001",
    "target": "BGLRRLABCSR001",

    "interface": "BE4"
  },
  {
    "source": "BGLRRLABCCR001",
    "target": "OcNOS",
    "interface": "BE11"
  },
  {
    "source": "BGLRRLABCCR001",
    "target": "MUMBRLB1CCR001",
    "interface": "BE911.5"
  },
  {
    "source": "MUMBRLB1CSR002",
    "target": "MUMBRLB1CCR001",
    "interface": "BE1"
  },
  {
    "source": "MUMBRLB1CSR002",
    "target": "MUMBRLB2CCR001",
    "interface": "BE2"
  },
  {
    "source": "MUMBRLB1CSR002",
    "target": "MUMBRLB1URR001",
    "interface": "Te0/1/0/11"
  },
  {
    "source": "MUMBRLB1CSR002",
    "target": "MUMBRLB1CSR001",
    "interface": "BE7"
  },
  {
    "source": "MUMBRLB1CSR002",
    "target": "MUMBRLB1IRR001",
    "interface": "Te0/1/0/9"
  },
  {
    "source": "NVMBNVMBICR001",
    "target": "MUMBBIDCICR002",
    "interface": "BE200"
  },
  {
    "source": "NVMBNVMBICR001",
    "target": "BGLRRLABAAR004",
    "interface": "BE6"
  },
  {
    "source": "NVMBNVMBICR001",
    "target": "BGLRRLABAAR003",
    "interface": "BE5"
  },
  {
    "source": "NVMBNVMBICR001",
    "target": "BGLRRLABAAR002",
    "interface": "BE21"
  },
  {
    "source": "NVMBNVMBICR001",
    "target": "MUMBMUMBICR001",
    "interface": "BE127"
  },
  {
    "source": "NVMBNVMBICR001",
    "target": "MUMBMUMBISR001",
    "interface": "BE40"
  },
  {
    "source": "NVMBNVMBICR001",
    "target": "MUMBRLB1IAR001",
    "interface": "BE4"
  },
  {
    "source": "NVMBNVMBICR001",
    "target": "MUMBRLB1IAR002",
    "interface": "BE3"
  },
  {
    "source": "BGLRRLABCSR002",
    "target": "BGLRRLABURR001",
    "interface": "Te0/2/0/7"
  },
  {
    "source": "BGLRRLABCSR002",
    "target": "BGLRRLABCCR002",
    "interface": "BE2"
  },
  {
    "source": "BGLRRLABCSR002",
    "target": "BGLRRLABCSR001",

    "interface": "BE14"
  },
  {
    "source": "BGLRRLABCSR002",
    "target": "BGLRRLABCCR001",
    "interface": "BE1"
  },
  {
    "source": "BGLRRLABCSR002",
    "target": "BGLRRLABVRR002",
    "interface": "Te0/2/1/9"
  },
  {
    "source": "BGLRRLABCSR002",
    "target": "BGLRRLABCCR002",
    "interface": "BE2.5"
  },
  {
    "source": "BGLRRLABVRR002",
    "target": "BGLRRLABCSR002",

    "interface": "TF0/0/0/2"
  },
  {
    "source": "BGLRRLABVRR002",
    "target": "BGLRRLABCSR001",

    "interface": "TF0/0/0/3"
  },
  {
    "source": "MUMBBIDCICR001",
    "target": "MUMBBIDCICR002",
    "interface": "BE250"
  },
  {
    "source": "MUMBBIDCICR001",
    "target": "MUMBMUMBICR002",
    "interface": "BE130"
  },
  {
    "source": "MUMBBIDCICR001",
    "target": "MUMBMUMBICR001",
    "interface": "BE128"
  },
  {
    "source": "MUMBBIDCICR001",
    "target": "MUMBMUMBISR001",
    "interface": "BE150"
  },
  {
    "source": "MUMBMUMBISR001",
    "target": "BGLRRLABCCR001",
    "interface": "BE200"
  },
  {
    "source": "MUMBMUMBISR001",
    "target": "MUMBBIDCICR001",
    "interface": "BE150"
  },
  {
    "source": "MUMBMUMBISR001",
    "target": "MUMBBIDCICR002",
    "interface": "BE158"
  },
  {
    "source": "MUMBMUMBISR001",
    "target": "MUMBMUMBICR001",
    "interface": "BE1"
  },
  {
    "source": "MUMBMUMBISR001",
    "target": "MUMBMUMBEUR001",
    "interface": "Te0/9/0/7"
  },
  {
    "source": "MUMBMUMBISR001",
    "target": "NVMBNVMBICR001",

    "interface": "BE40"
  },
  {
    "source": "MUMBBIDCICR002",
    "target": "MUMBBIDCICR001",
    "interface": "BE250"
  },
  {
    "source": "MUMBBIDCICR002",
    "target": "MUMBMUMBICR001",
    "interface": "BE156"
  },
  {
    "source": "MUMBBIDCICR002",
    "target": "MUMBMUMBISR001",
    "interface": "BE158"
  },
  {
    "source": "MUMBBIDCICR002",
    "target": "NVMBNVMBICR001",
    "interface": "BE200"
  }
]

// =========================
// EXPORT FOR CYTOSCAPE
// =========================

export const initialElements = [
  // ...nodes,
  ...edges
];


