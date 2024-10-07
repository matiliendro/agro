import HomeClient from '@/components/HomeClient'
import Footer from '@/components/Footer'
import Layout from '@/components/Layout'

export default function Home() {
  return (
    <Layout>
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-4xl">
        <HomeClient />
      </main>
    </div>
    </Layout>
  )
}