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
    "loopbackIP": "x.x.x.1",
    "role": "CSR",
    "status": "UP",
    "level": "L3"
  },
  "MUMBRLB2CCR001": {
    "id": "MUMBRLB2CCR001",
    "label": "MUMBRLB2CCR001",
    "hostname": "MUMBRLB2CCR001",
    "platform": "Juniper MX960",
    "loopbackIP": "x.x.x.2",
    "role": "CCR",
    "status": "UP",
    "level": "L2"
  },
  "MUMBRLB1IAR001": {
    "label": "MUMBRLB1IAR001",
    "hostname": "MUMBRLB1IAR001",
    "platform": "Cisco NCS5500",
    "loopbackIP": "x.x.x.3",
    "role": "IAR",
    "status": "UP",
    "level": "L4"
  },
  "MUMBRLB1CCR001": {
    "id": "MUMBRLB1CCR001",
    "label": "MUMBRLB1CCR001",
    "hostname": "MUMBRLB1CCR001",
    "platform": "Juniper MX480",
    "loopbackIP": "x.x.x.4",
    "role": "CCR",
    "status": "DOWN",
    "level": "L2"
  },
  "BGLRRLABCCR001": {
    "id": "BGLRRLABCCR001",
    "label": "BGLRRLABCCR001",
    "hostname": "BGLRRLABCCR001",
    "platform": "Cisco ASR9904",
    "loopbackIP": "x.x.x.5",
    "role": "CCR",
    "status": "UP",
    "level": "L2"
  },
  "MUMBRLB1CSR002": {
    "id": "MUMBRLB1CSR002",
    "label": "MUMBRLB1CSR002",
    "hostname": "MUMBRLB1CSR002",
    "platform": "Nokia 7750 SR",
    "loopbackIP": "x.x.x.6",
    "role": "CSR",
    "status": "UP",
    "level": "L3"
  },
  "NVMBNVMBICR001": {
    "id": "NVMBNVMBICR001",
    "label": "NVMBNVMBICR001",
    "hostname": "NVMBNVMBICR001",
    "platform": "Cisco NCS540",
    "loopbackIP": "x.x.x.7",
    "role": "ICR",
    "status": "UP",
    "level": "L5"
  },
  "BGLRRLABCSR002": {
    "id": "BGLRRLABCSR002",
    "label": "BGLRRLABCSR002",
    "hostname": "BGLRRLABCSR002",
    "platform": "Juniper ACX710",
    "loopbackIP": "x.x.x.8",
    "role": "CSR",
    "status": "MAINTENANCE",
    "level": "L3"
  },
  "BGLRRLABVRR002": {
    "id": "BGLRRLABVRR002",
    "label": "BGLRRLABVRR002",
    "hostname": "BGLRRLABVRR002",
    "platform": "Cisco ISR4451",
    "loopbackIP": "x.x.x.9",
    "role": "VRR",
    "status": "UP",
    "level": "L6"
  },
  "MUMBBIDCICR001": {
    "id": "MUMBBIDCICR001",
    "label": "MUMBBIDCICR001",
    "hostname": "MUMBBIDCICR001",
    "platform": "Nokia 7250 IXR",
    "loopbackIP": "x.x.x.10",
    "role": "ICR",
    "status": "UP",
    "level": "L5"
  },
  "MUMBMUMBISR001": {
    "id": "MUMBMUMBISR001",
    "label": "MUMBMUMBISR001",
    "hostname": "MUMBMUMBISR001",
    "platform": "Cisco Catalyst 9500",
    "loopbackIP": "x.x.x.11",
    "role": "ISR",
    "status": "DOWN",
    "level": "L4"
  },
  "MUMBBIDCICR002": {
    "id": "MUMBBIDCICR002",
    "label": "MUMBBIDCICR002",
    "hostname": "MUMBBIDCICR002",
    "platform": "Juniper MX204",
    "loopbackIP": "x.x.x.12",
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
    "id": "MUMBRLB1CSR001-MUMBRLB2CCR001",
    "source": "MUMBRLB1CSR001",
    "target": "MUMBRLB1CCR001",
    "interface": "BE1"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB2CCR001",
    "source": "MUMBRLB1CSR001",
    "target": "MUMBRLB2CCR001",
    "interface": "BE2"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "MUMBRLB1CSR001",
    "target": "MUMBRLB1CSR002",
    "interface": "BE7"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1URR001",
    "source": "MUMBRLB1CSR001",
    "target": "MUMBRLB1URR001",
    "interface": "Te0/4/0/9"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IRR001",
    "source": "MUMBRLB1CSR001",
    "target": "MUMBRLB1CRR001",
    "interface": "Te0/4/0/11"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IRR001",
    "source": "MUMBRLB1CSR001",
    "target": "MUMBRLB1IRR001",
    "interface": "Te0/4/0/7"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "MUMBRLB2CCR001",
    "target": "MUMBRLB1CCR001",
    "interface": "BE912"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "MUMBRLB2CCR001",
    "target": "MUMBRLB1AAR001",
    "interface": "BE703"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB2AAR001",
    "source": "MUMBRLB2CCR001",
    "target": "MUMBRLB2AAR001",
    "interface": "BE704"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "MUMBRLB2CCR001",
    "target": "MUMBRLB1IAR002",
    "interface": "BE222"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "MUMBRLB2CCR001",
    "target": "MUMBRLB1CSR002",
    "interface": "BE5"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "MUMBRLB2CCR001",
    "target": "MUMBRLB1IAR001",
    "interface": "BE111"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "MUMBRLB2CCR001",
    "target": "MUMBRLB1CSR001",
    "interface": "BE4"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "MUMBRLB2CCR001",
    "target": "BGLRRLABCCR002",
    "interface": "BE801"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "MUMBRLB2CCR001",
    "target": "MUMBRLB1CSR005",
    "interface": "Te0/1/0/5"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "MUMBRLB2CCR001",
    "target": "MUMBRLB1CSR006",
    "interface": "Te0/1/0/7"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "MUMBRLB2CCR001",
    "target": "MUMBRLB1IAR001",
    "interface": "BE111.5"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "MUMBRLB2CCR001",
    "target": "BGLRRLABCCR002",
    "interface": "BE801.5"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "MUMBRLB1IAR001",
    "target": "MUMBRLB1CCR001",
    "interface": "BE1"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "MUMBRLB1IAR001",
    "target": "MUMBRLB2CCR001",
    "interface": "BE111"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "MUMBRLB1IAR001",
    "target": "MUMBMUMBICR001",
    "interface": "BE200"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "MUMBRLB1IAR001",
    "target": "MUMBMUMBWRR001",
    "interface": "Te0/1/0/2"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "MUMBRLB1IAR001",
    "target": "NVMBNVMBICR001",
    "interface": "BE201"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "MUMBRLB1IAR001",
    "target": "MUMBRLB1CCR001",
    "interface": "BE1.5"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "MUMBRLB1IAR001",
    "target": "MUMBRLB2CCR001",
    "interface": "BE111.5"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "MUMBRLB1CCR001",
    "target": "MUMBRLB1AAR001",
    "interface": "BE701"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "MUMBRLB1CCR001",
    "target": "MUMBRLB2CCR001",
    "interface": "BE912"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB2AAR001",
    "source": "MUMBRLB1CCR001",
    "target": "MUMBRLB2AAR001",
    "interface": "BE702"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "MUMBRLB1CCR001",
    "target": "MUMBRLB1CSR002",
    "interface": "BE2"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "MUMBRLB1CCR001",
    "target": "MUMBRLB1IAR001",
    "interface": "BE3"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "MUMBRLB1CCR001",
    "target": "MUMBRLB1CSR001",
    "interface": "BE1"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "MUMBRLB1CCR001",
    "target": "BGLRRLABCCR001",
    "interface": "BE911"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "MUMBRLB1CCR001",
    "target": "MUMBRLB1CSR005",
    "interface": "Te0/2/0/0"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "MUMBRLB1CCR001",
    "target": "MUMBRLB1CSR006",
    "interface": "Te0/2/0/1"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "MUMBRLB1CCR001",
    "target": "MUMBRLB1IAR001",
    "interface": "BE3.5"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "MUMBRLB1CCR001",
    "target": "BGLRRLABCCR001",
    "interface": "BE911.5"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "BGLRRLABCCR001",
    "target": "BGLRRLABAAR003",
    "interface": "BE801"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "BGLRRLABCCR001",
    "target": "BGLRRLABAAR002",

    "interface": "BE702"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "BGLRRLABCCR001",
    "target": "BGLRRLABAAR001",

    "interface": "BE701"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "BGLRRLABCCR001",
    "target": "MUMBRLB1CCR001",
    "interface": "BE911"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "BGLRRLABCCR001",
    "target": "MUMBMUMBISR001",
    "interface": "BE200"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "BGLRRLABCCR001",
    "target": "BGLRRLABCSR002",
    "interface": "BE5"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "BGLRRLABCCR001",
    "target": "BGLRRLABCSR001",

    "interface": "BE4"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "BGLRRLABCCR001",
    "target": "OcNOS",
    "interface": "BE11"
  },
  {
    "id": "MUMBRLB1CSR001-MUMBRLB1IAR001",
    "source": "BGLRRLABCCR001",
    "target": "MUMBRLB1CCR001",
    "interface": "BE911.5"
  },
  {
    "id": "MUMBRLB1CSR002-MUMBRLB1IAR001",
    "source": "MUMBRLB1CSR002",
    "target": "MUMBRLB1CCR001",
    "interface": "BE1"
  },
  {
    "id": "MUMBRLB1CSR002-MUMBRLB1IAR001",
    "source": "MUMBRLB1CSR002",
    "target": "MUMBRLB2CCR001",
    "interface": "BE2"
  },
  {
    "id": "MUMBRLB1CSR002-MUMBRLB1IAR001",
    "source": "MUMBRLB1CSR002",
    "target": "MUMBRLB1URR001",
    "interface": "Te0/1/0/11"
  },
  {
    "id": "MUMBRLB1CSR002-MUMBRLB1IAR001",
    "source": "MUMBRLB1CSR002",
    "target": "MUMBRLB1CSR001",
    "interface": "BE7"
  },
  {
    "id": "MUMBRLB1CSR002-MUMBRLB1IAR001",
    "source": "MUMBRLB1CSR002",
    "target": "MUMBRLB1IRR001",
    "interface": "Te0/1/0/9"
  },
  {
    "id": "NVMBNVMBICR001-MUMBBIDCICR002",
    "source": "NVMBNVMBICR001",
    "target": "MUMBBIDCICR002",
    "interface": "BE200"
  },
  {
    "id": "NVMBNVMBICR001-BGLRRLABAAR004",
    "source": "NVMBNVMBICR001",
    "target": "BGLRRLABAAR004",
    "interface": "BE6"
  },
  {
    "id": "NVMBNVMBICR001-BGLRRLABAAR003",
    "source": "NVMBNVMBICR001",
    "target": "BGLRRLABAAR003",
    "interface": "BE5"
  },
  {
    "id": "NVMBNVMBICR001-BGLRRLABAAR002",
    "source": "NVMBNVMBICR001",
    "target": "BGLRRLABAAR002",
    "interface": "BE21"
  },
  {
    "id": "NVMBNVMBICR001-MUMBMUMBICR001",
    "source": "NVMBNVMBICR001",
    "target": "MUMBMUMBICR001",
    "interface": "BE127"
  },
  {
    "id": "NVMBNVMBICR001-MUMBMUMBISR001",
    "source": "NVMBNVMBICR001",
    "target": "MUMBMUMBISR001",
    "interface": "BE40"
  },
  {
    "id": "NVMBNVMBICR001-MUMBRLB1IAR001",
    "source": "NVMBNVMBICR001",
    "target": "MUMBRLB1IAR001",
    "interface": "BE4"
  },
  {
    "id": "NVMBNVMBICR001-MUMBRLB1IAR002",
    "source": "NVMBNVMBICR001",
    "target": "MUMBRLB1IAR002",
    "interface": "BE3"
  },
  {
    "id": "BGLRRLABCSR002-BGLRRLABURR001",
    "source": "BGLRRLABCSR002",
    "target": "BGLRRLABURR001",
    "interface": "Te0/2/0/7"
  },
  {
    "id": "BGLRRLABCSR002-BGLRRLABCCR002",
    "source": "BGLRRLABCSR002",
    "target": "BGLRRLABCCR002",
    "interface": "BE2"
  },
  {
    "id": "BGLRRLABCSR002-BGLRRLABCSR001",
    "source": "BGLRRLABCSR002",
    "target": "BGLRRLABCSR001",

    "interface": "BE14"
  },
  {
    "id": "BGLRRLABCSR002-BGLRRLABCCR001",
    "source": "BGLRRLABCSR002",
    "target": "BGLRRLABCCR001",
    "interface": "BE1"
  },
  {
    "id": "BGLRRLABCSR002-BGLRRLABVRR002",
    "source": "BGLRRLABCSR002",
    "target": "BGLRRLABVRR002",
    "interface": "Te0/2/1/9"
  },
  {
    "id": "BGLRRLABCSR002-BGLRRLABCCR002",
    "source": "BGLRRLABCSR002",
    "target": "BGLRRLABCCR002",
    "interface": "BE2.5"
  },
  {
    "id": "BGLRRLABVRR002-BGLRRLABCSR002",
    "source": "BGLRRLABVRR002",
    "target": "BGLRRLABCSR002",

    "interface": "TF0/0/0/2"
  },
  {
    "id": "BGLRRLABVRR002-BGLRRLABCSR001",
    "source": "BGLRRLABVRR002",
    "target": "BGLRRLABCSR001",

    "interface": "TF0/0/0/3"
  },
  {
    "id": "MUMBBIDCICR001-MUMBBIDCICR002",
    "source": "MUMBBIDCICR001",
    "target": "MUMBBIDCICR002",
    "interface": "BE250"
  },
  {
    "id": "MUMBBIDCICR001-MUMBMUMBICR002",
    "source": "MUMBBIDCICR001",
    "target": "MUMBMUMBICR002",
    "interface": "BE130"
  },
  {
    "id": "MUMBBIDCICR001-MUMBMUMBICR001",
    "source": "MUMBBIDCICR001",
    "target": "MUMBMUMBICR001",
    "interface": "BE128"
  },
  {
    "id": "MUMBBIDCICR001-MUMBMUMBISR001",
    "source": "MUMBBIDCICR001",
    "target": "MUMBMUMBISR001",
    "interface": "BE150"
  },
  {
    "id": "MUMBMUMBISR001-BGLRRLABCCR001",
    "source": "MUMBMUMBISR001",
    "target": "BGLRRLABCCR001",
    "interface": "BE200"
  },
  {
    "id": "MUMBMUMBISR001-MUMBBIDCICR001",
    "source": "MUMBMUMBISR001",
    "target": "MUMBBIDCICR001",
    "interface": "BE150"
  },
  {
    "id": "MUMBMUMBISR001-MUMBBIDCICR002",
    "source": "MUMBMUMBISR001",
    "target": "MUMBBIDCICR002",
    "interface": "BE158"
  },
  {
    "id": "MUMBMUMBISR001-MUMBMUMBICR001",
    "source": "MUMBMUMBISR001",
    "target": "MUMBMUMBICR001",
    "interface": "BE1"
  },
  {
    "id": "MUMBMUMBISR001-MUMBMUMBEUR001",
    "source": "MUMBMUMBISR001",
    "target": "MUMBMUMBEUR001",
    "interface": "Te0/9/0/7"
  },
  {
    "id": "MUMBMUMBISR001-NVMBNVMBICR001",
    "source": "MUMBMUMBISR001",
    "target": "NVMBNVMBICR001",

    "interface": "BE40"
  },
  {
    "id": "MUMBBIDCICR002-MUMBBIDCICR001",
    "source": "MUMBBIDCICR002",
    "target": "MUMBBIDCICR001",
    "interface": "BE250"
  },
  {
    "id": "MUMBBIDCICR002-MUMBMUMBICR001",
    "source": "MUMBBIDCICR002",
    "target": "MUMBMUMBICR001",
    "interface": "BE156"
  },
  {
    "id": "MUMBBIDCICR002-MUMBMUMBISR001",
    "source": "MUMBBIDCICR002",
    "target": "MUMBMUMBISR001",
    "interface": "BE158"
  },
  {
    "id": "MUMBBIDCICR002-MUMBMUMBICR002",
    "source": "MUMBBIDCICR002",
    "target": "MUMBMUMBICR002",
    "interface": "BE158"
  }
]

export const graph = edges.reduce((acc, edge) => {
  if (!acc[edge.source]) {
    acc[edge.source] = [];
  }

  acc[edge.source].push({
    target: edge.target,
    interface: edge.interface,
  });

  return acc;
}, {});

export const nodeMap = Object.fromEntries(Object.values(nodes).map(n => [n.id, n]));

export const edgeLabels = Object.fromEntries(edges.map(e => [`${e.source}|${e.target}`, e.interface]));

export const hierarchy = Object.fromEntries(Object.keys(nodes).map(n => [nodes[n].id, edges.filter(e => e.source === nodes[n].id).map(e => e.target)]));

// export const hierarchy = (node, edges) => {
//   const children = edges
//     .filter(e => e.source === node.id)
//     .map(e => e.target);
//   return children;
// }

// =========================
// EXPORT FOR CYTOSCAPE
// =========================

export const initialElements = [
  // ...nodes,
  ...edges
];


