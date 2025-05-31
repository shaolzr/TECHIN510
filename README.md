# Grocery Assistant

This project is a **Next.js-based** web application designed as a grocery assistant tool.

## 📁 Project Structure

- `app/`: Next.js pages.
- `components/`: React components.
- `public/`: Static assets.
- `package.json`, `pnpm-lock.yaml`: Project configuration files.

---

## 🚀 How to Run

Follow these steps to run the project locally:

1️⃣ **Navigate to the project directory:**

```bash
cd grocery-assistant
```

2️⃣ Install dependencies:
```bash
pnpm install
```
(If you don’t have pnpm, install it globally first:)
```bash
npm install -g pnpm
```
3️⃣ Run the development server:
```bash
pnpm dev
```


# Meeting note0530 updates:

## What features are complete:

• User dietary preference configuration (supports health needs and exclusion of ingredients, with persistent storage)

• Store selection and matching (search, load inventory, filter by preferences)

• Filtered product list display (product cards with image, name, health-related tags, recommendation status, and option to add to shopping list)

• Shopping list management (favoriting, marking as purchased, deleting, reordering)

• MVP architecture is complete, with a well-structured logic and data flow

## Any outstanding items:

• The recommendation sorting algorithm is not yet implemented; a simple open-source algorithm should be used for sorting

• The camera module integration is incomplete; if time is tight, use photo uploads instead of accessing the camera for testing

## Whether the project meets your original goal:

Yes, the project has implemented the core MVP features, covering all major user pathways, and meets the initial project goals. The next step is to enhance the interface interactions and test the sorting functionality.
