"use client";

import { Button } from "@/components/ui/button";
import {  CLIENT_LOGIN, DEMO_DASHBOARD } from "@/routes/websitePanelRoute";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-blue-800">
          📊 Track Your Trades Like a Pro
        </h1>
        <p className="text-gray-700 max-w-xl mb-8 leading-relaxed">
          Analyze your performance, improve your strategy, and grow consistently with powerful insights.
        </p>
        <div className="flex gap-5">
          <Link href={CLIENT_LOGIN}>
            <Button className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition">
              Get Started
            </Button>
          </Link>
          <Link href={DEMO_DASHBOARD}>
            <Button className="bg-gray-100 text-neutral-800 font-medium px-6 py-3 rounded-lg shadow-sm hover:bg-gray-200 hover:shadow-md transition border">
              View Demo
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
          <h3 className="text-xl font-semibold mb-2">📈 Win Rate Tracking</h3>
          <p className="text-gray-600">See your performance at a glance.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
          <h3 className="text-xl font-semibold mb-2">📊 PnL Charts</h3>
          <p className="text-gray-600">Visualize profits and losses over time.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
          <h3 className="text-xl font-semibold mb-2">🔍 Trade Filters</h3>
          <p className="text-gray-600">Filter trades by strategy, symbol, or date.</p>
        </div>
      </section>

      {/* Image */}
      <section className="px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-10 text-blue-800">See Your Dashboard in Action</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center "
      >

        <div className="max-w-4xl mx-auto">
          <Image
            src="/dashboard.png"
            height={200}
            width={250}
            alt="Trading Dashboard Preview"
            className="rounded-xl shadow-lg hover:scale-105 transition-transform"
          />
        </div>
        <div className="max-w-4xl mx-auto">
          <Image
            src="/analy.png"
            height={200}
            width={250}
            alt="Trading Dashboard Preview"
            className="rounded-xl shadow-lg hover:scale-105 transition-transform"
          />
        </div>
        <div className="max-w-4xl mx-auto">
          <Image
            src="/t3.png"
            height={200}
            width={250}
            alt="Trading Dashboard Preview"
            className="rounded-xl shadow-lg hover:scale-105 transition-transform"
          />
        </div>
        <div className="max-w-4xl mx-auto">
          <Image
            src="/t4.jpg"
            height={210}
            width={250}
            alt="Trading Dashboard Preview"
            className="rounded-xl shadow-lg hover:scale-105 transition-transform"
          />
        </div>
        
      </div>

      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Journal Smarter?</h2>
        <Link href={CLIENT_LOGIN}>
          <Button className="bg-white text-blue-700 font-semibold px-8 py-4 rounded-lg shadow-md hover:bg-gray-100 transition">
            Start Journaling Free
          </Button>
        </Link>
      </section>


    </div>
  );
}
