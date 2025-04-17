# 🔧 Projekttitel (Platzhalter): RackDoc oder RackMaster

## 🧠 Idee zusammengefasst:
Ein Web-Tool, mit dem man Server-Racks visuell und datenbasiert planen, dokumentieren und verwalten kann:

- Was steckt wo? (Server, Switches, USVs etc.)
- Wie verkabelt? (Patchpanels, Switch-Ports, Kabel-Führung)
- Was ist installiert? (OS, Dienste, IPs, VLANs etc.)
- Welche Hardware steckt drin? (RAM, HDDs, CPUs, SNs)
- Was ist verbunden mit was? (logisch + physisch)

## 🎯 Zielgruppen:
- Hoster
- Sysadmins
- IT-Abteilungen
- Homelab-Freaks
- MSPs (Managed Service Providers)
- MakerSpaces / TechSpaces

## 💡 Kernfeatures
### 📦 Rack View
- Visualisierung von 19"-Racks (RU-basiert)
- Drag & Drop von Devices
- Höhe, Tiefe, Front-/Back-Mount
- Visualisierung von Belegung (z.B. farblich pro Gerätetyp)

### 🔌 Verkabelung & Netzwerk
- Dokumentation physikalischer Ports
- Verbindung von Switch-Port zu Patchpanel zu Server
- Farbcode & Kategorie für Kabel
- Netzplan (logisch)

### 🧾 Geräteverwaltung
- Gerätetypen (Switch, USV, Server, NAS …)
- Seriennummer, Hersteller, Modell, SNMP-Adresse, Garantie
- OS / Firmware / Installierte Software
- IPs, VLANs, MACs, Dienste pro Host

### 🧑‍🔧 Dokumentation & Historie
- Änderungsverlauf je Gerät
- Wartungsprotokolle
- Notizen pro Rack / Gerät
- Fotos (z. B. der realen Verkabelung)

### 🔎 Suche & Reporting
- Suchfunktion: „Welche Server haben CentOS?“
- PDF- oder CSV-Export der Rackbelegung
- Inventar-Berichte

### 🧱 Tech Stack passt perfekt
#### Backend (NestJS)
- Auth (z. B. JWT + RBAC)
- REST
- Postgres für Datenmodell
- Redis für Caching / Vorschau / Last-View

#### Background Worker (z. B. für SNMP-Polling oder Gerätedaten-Import)

#### Frontend (React)
- Rack-Editor mit Drag & Drop
- Device-Formulare (Modal oder Tab)
- Topologie-Ansicht (z. B. mit D3.js oder react-flow)
- Authentifizierung (z. B. über Clerk/Auth0 oder selbst gebaut)
- Themes (Dark Mode = Pflicht 😎)

#### Deployment (Docker)
- NestJS, React, Postgres, Redis in separaten Containern
- docker-compose für Dev & Prod
- später skalierbar mit Kubernetes/Swarm

## 🔄 Bonusideen für später:
- QR-Codes pro Gerät (z. B. für Handy-Aufruf vor Ort)
- API für Asset-Import (z. B. aus Zabbix, i-doit, etc.)
- SNMP-Auto-Discovery
- Temperatur-/Power-Visualisierung via SNMP
- User-Kommentare oder Doku pro Port
- Mobile View für Techniker im Rechenzentrum

## 📁 Mögliche Datenmodelle (Postgres, stark vereinfacht):

````typescript

Rack {
  id
  name
  location
  height_ru
}

Device {
  id
  rack_id (FK)
  name
  height_ru
  position_ru
  front_mounted: boolean
  model
  serial_number
  device_type
}

Port {
  id
  device_id
  label
  type
  vlan
  description       // ✍️ Kurze Doku, z.B. "Uplink zu Switch 2"
  notes[]           // 💬 Array von Kommentaren
}

PortComment {
  id
  port_id (FK)
  user_id (FK)
  comment_text
  created_at
}

Cable {
  id
  from_port_id (FK)
  to_port_id (FK)
  color
  category
}

````