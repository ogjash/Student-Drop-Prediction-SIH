'use client'

import React, { useEffect, useRef } from 'react'
import { DotBackground, MovingButton, TabsDemo, DarkButton, LightButton, Badge, Card, CardContent, TextHighlight } from '../components/index.js'
import { motion } from "framer-motion"
import {
  BadgeMinus,
  FileClock,
  Frown,
  Brain,
  Database,
  Star,
  Zap,
  Shield,
  Users,
} from "lucide-react"

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

  // Common motion props for all sections
  const motionProps = {
    initial: "hidden",
    whileInView: "show",
    exit: "hidden",
    viewport: { 
      once: false, // Allow repeated animations
      margin: "-100px",
      amount: 0.2 // Trigger animation when 40% of element is visible
    }
  }

  const problems = [
    {
      title: "Silent Struggles",
      description: "Many students in government colleges silently struggle with low attendance, poor academic performance, or financial difficulties. By the time final results expose failures, these students have already disengaged, making recovery nearly impossible.",
      icon: <Frown className="size-5" />, 
    },
    {
      title: "Scattered Data",
      description: "Data that could reveal early warning signs like attendance sheets, exam records, and due fees remains scattered across multiple spreadsheets, with no unified view for administrators or mentors.",
      icon: <FileClock className="size-5" />,
    },
    {
      title: "Missed Opportunities",
      description: "Without a simple system to highlight students at risk, opportunities for timely intervention are lost, leading to rising dropout rates and wasted potential.",
      icon: <BadgeMinus className="size-5" />,
    },
  ];

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
  ];

  const solutions = [
    {
      point: "Unified Dashboard",
      description: "Our platform provides a centralized digital dashboard that unifies attendance, examination scores, and fee records into a single, accessible system.",
    },
    {
      point: "ML-Powered Predictions",
      description: "Using machine learning models, it predicts the likelihood of student dropouts, flagging at-risk learners early with transparent indicators.",
    },
    {
      point: "Real-time Risk Analysis",
      description: "Continuous monitoring and analysis of student data to identify patterns and trends that may indicate potential dropout risks.",
    },
    {
      point: "Automated Alert System",
      description: "Instant notifications to relevant stakeholders when risk factors exceed critical thresholds, ensuring timely interventions.",
    },
    {
      point: "Customizable Thresholds",
      description: "Institutions can set their own risk parameters based on historical data and specific requirements of their educational environment.",
    },
    {
      point: "Progress Tracking",
      description: "Monitor the effectiveness of interventions through detailed analytics and progress reports for at-risk students.",
    },
    {
      point: "Proactive Intervention",
      description: "The system empowers administrators and mentors through timely alerts, department-wise monitoring, and counseling support tools.",
    },
    {
      point: "Data Security",
      description: "Robust encryption and access controls ensure student data remains secure while maintaining transparency for authorized personnel.",
    }
  ];

  return (
    <div className="hero min-h-screen bg-[#fff] flex flex-col items-center w-full max-w-full overflow-x-hidden">
      <div className="text-center pt-16 md:pt-32 px-4 md:px-0 w-full max-w-full">
          <MovingButton
            borderRadius="1.75rem"
            className="mb-4 rounded-full px-4 py-1.5 bg-white text-black border-neutral-200"
          >
            SIH Prototype
          </MovingButton>

        <h1 className="text-3xl md:text-5xl font-bold text-[#1c1d1f] mb-4">
          Smarter Insights <br className="md:block hidden" /> Stronger Support.
        </h1>
        <h2 className="text-xl md:text-2xl text-[#505967] mb-8">
          Helping educators act early to reduce dropout rates.
        </h2>
        <div className="space-x-3 sm:space-x-4 justify-center">
          <DarkButton text="Demo" />
          <LightButton text="Preview"/>
        </div>
      </div>

      <div className="tabs w-full max-w-full overflow-x-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white pointer-events-none z-10"></div>
        <TabsDemo />
        <div className="w-full h-px bg-gray-200 my-8 relative z-20" />
      </div>

      <section id="quote" className="h-200 w-full grid place-content-center sticky top-0">
        <TextHighlight className="max-w-5xl text-3xl sm:text-4xl md:text-5xl lg:text-7xl px-8 font-bold text-center tracking-tight leading-[120%]">
          "All of us do not have equal talent, but all of us should have an equal opportunity to develop our talents."
        </TextHighlight>
        <div className='text-1xl md:text-2xl text-center text-gray-500 mt-10'>Dr. A.P.J. Abdul Kalam</div>
      </section>

      <section id="problem" className="w-full py-24 md:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            {...motionProps}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-4 text-center mb-12"
          >
            <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
              Problem
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
              Why Current Systems Fail?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
            {problems.map((problem, i) => (
              <motion.div
                key={i}
                {...motionProps}
                variants={item}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
                  <CardContent className="p-4 md:p-6 flex flex-col h-full">
                    <div className="size-8 md:size-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-3 md:mb-4">
                      {problem.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold mb-2">{problem.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground text-justify">{problem.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="solution" className="w-full py-24 md:py-32">
        <DotBackground>
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              {...motionProps}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-4 text-center mb-16"
            >
              <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
                Solution
              </Badge>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-[#0a0a0a]">
                ML-Powered Early Warning System
              </h2>
            </motion.div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {solutions.map((solution, i) => (
                <motion.div
                  key={i}
                  {...motionProps}
                  variants={item}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-4 items-start group"
                >
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-900 font-semibold text-sm shrink-0 transition-colors group-hover:bg-gray-200">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                      {solution.point}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-justify">
                      {solution.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </DotBackground>
      </section>

      <section id="features" className="flex items-center justify-center w-full py-12 md:py-20 lg:py-32 px-2 sm:px-4 max-w-full overflow-x-hidden">
        <div className="container max-w-full px-0 sm:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            viewport={{ once: false, margin: "-100px", amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12"
          >
            <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
              Features
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight px-4">Smart, simple, and effective.</h2>
            <p className="max-w-[800px] text-muted-foreground text-base md:text-lg px-4">
              Our dashboard combines data, prediction, and alerts into simple, powerful features that empower educators to act early and effectively.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            exit="hidden"
            viewport={{ once: false }}
            className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-full"
          >
            {features.map((feature, i) => (
              <motion.div key={i} variants={item}>
                <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
                  <CardContent className="p-4 md:p-6 flex flex-col h-full">
                    <div className="size-8 md:size-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-3 md:mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground">{feature.description}</p>
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