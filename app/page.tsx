import Header from "@/components/header"
import Hero from "@/components/hero"
import Categories from "@/components/categories"
import SearchBar from "@/components/search-bar"
import FeaturedProducts from "@/components/featured-products"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <div className="container mx-auto px-4 py-8">
          <SearchBar />
          <Categories />
          <FeaturedProducts />
        </div>
      </main>
      <Footer />
    </div>
  )
}
