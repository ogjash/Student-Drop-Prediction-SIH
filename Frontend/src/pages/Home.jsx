import React, { useEffect, useRef } from 'react'
import DarkButton from '../components/ui/DarkButton.jsx'
import LightButton from '../components/ui/LightButton.jsx'
import { Button } from "../components/ui/MovingBorder.jsx"
import { TabsDemo } from "../components/ui/TabsDemo.jsx"
import { motion } from "framer-motion"
import {
  Brain,
  Database,
  Star,
  Zap,
  Shield,
  Users,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const Home = () => {
    const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const features = [
    {
      title: "Data Integration",
      description: "Combines attendance, examination, and fee records into a unified profile, reducing fragmentation and improving institutional efficiency.",
      icon: <Database className="size-5" />,
    },
    {
      title: "Ai Risk Prediction",
      description: "Applies machine learning models to identify dropout risks early, enabling data-driven preventive measures and interventions.",
      icon: <Brain className="size-5" />,
    },
    {
      title: "Department Access",
      description: "Enables department-wise admin accounts to view predictions, ensuring localized monitoring and responsibility across multiple academic divisions.",
      icon: <Users className="size-5" />,
    },
    {
      title: "Smart Alerts",
      description: "Automatically sends timely notifications to mentors, faculty, and guardians, ensuring proactive action before issues escalate further.",
      icon: <Shield className="size-5" />,
    },
    {
      title: "Counseling Tracker",
      description: "Logs counseling sessions and follow-ups, helping educators monitor student progress and ensure accountability across interventions.",
      icon: <Star className="size-5" />,
    },
    {
      title: "Simple Access",
      description: "Requires minimal training, ensuring user-friendly adoption and seamless scalability within resource-constrained government college environments.",
      icon: <Zap className="size-5" />,
    },
  ]
  return (
    
    <div className="min-h-340 bg-[#fff] flex flex-col items-center">
      <div className="text-center pt-32">
          <Button
            borderRadius="1.75rem"
            className="mb-4 rounded-full px-4 py-1.5 bg-white text-black border-neutral-200"
          >
            SIH Prototype
          </Button>

        <h1 className="text-5xl font-bold text-[#1c1d1f] mb-4">
          Smarter Insights <br /> Stronger Support.
        </h1>
        <h2 className="text-2xl text-[#505967] mb-8">
          Helping educators act early to reduce dropout rates.
        </h2>
        <div className="space-x-4">
          <DarkButton text="Demo" />
          <LightButton text="Preview"/>
        </div>
      </div>

      <TabsDemo />

        <section id="features" className="flex items-center justify-center w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
                Features
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Smart, simple, and effective.</h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                Our dashboard combines data, prediction, and alerts into simple, powerful features that empower educators to act early and effectively.
              </p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {features.map((feature, i) => (
                <motion.div key={i} variants={item}>
                  <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="size-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

    </div>
  )
}

export default Home