import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import LiveElectionData from './components/LiveElectionData'
import VoterTools from './components/VoterTools'
import BoothFinder from './components/BoothFinder'
import VoterDocumentUpload from './components/VoterDocumentUpload'
import ElectionTimeline from './components/ElectionTimeline'
import FormGuide from './components/FormGuide'
import Checklist from './components/Checklist'
import StateResources from './components/StateResources'
import Footer from './components/Footer'
import PromptModalFAB from './components/PromptModalFAB'
import ErrorBoundary from './components/ErrorBoundary'
import HealthCheck from './components/HealthCheck'

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <LiveElectionData />
      <main className="flex-grow">
        <Hero />
        <VoterTools />
        
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Voter Verification Portal</h2>
              <p className="text-lg text-slate-600">Securely submit your documents for identity verification.</p>
            </div>
            <ErrorBoundary>
              <VoterDocumentUpload />
            </ErrorBoundary>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BoothFinder />
          </div>
        </section>
        <ElectionTimeline />
        <FormGuide />
        <Checklist />
        <StateResources />
      </main>
      <Footer />
      <PromptModalFAB />
      <HealthCheck />
    </div>
    </ErrorBoundary>
  )
}

export default App
