# Bulk Vegetable/Fruit Ordering Platform

A web application that facilitates bulk vegetable/fruit orders, allowing buyers to browse products, place bulk orders, and track order status. Admins can manage orders and inventory efficiently.

## Features

### For Buyers:
- **Browse Products**: View a catalog of available vegetables/fruits with basic details (name, price per unit).
- **Place Orders**: Buyers can place bulk orders specifying item name, quantity, and delivery details (name, contact, address).
- **Track Orders**: Buyers can track the status of their orders (Pending, In Progress, Delivered).

### For Admins:
- **Order Management**: View and manage orders, with the ability to update the status of orders.
- **Inventory Management**: Add, edit, and remove products from the catalog.

## Tech Stack
- **Frontend**: Next.js (React framework)
- **Backend**: Next.js API routes (or Express/Flask)
- **Database**: PostgreSQL hosted on Neon.tech (or Docker containerized Postgres)
- **Deployment**: Vercel (preferred) or Netlify

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/bulk-ordering-platform.git
cd bulk-ordering-platform
