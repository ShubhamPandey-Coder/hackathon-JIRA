
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchForm } from "@/components/SearchForm";
import { SearchResults } from "@/components/SearchResults";
import { PreviewDialog } from "@/components/PreviewDialog";
import { Search, Database, FileText } from "lucide-react";

export interface SearchResult {
  id: string;
  title: string;
  type: "jira" | "confluence" | "cs";
  url: string;
  summary?: string;
  status?: string;
  createdDate?: string;
  application: string;
}

const Index = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SearchResult | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleSearch = async (keyword: string, applications: string[], linkTypes: string[], jurisdictions: string[]) => {
    setIsLoading(true);
    console.log("Searching for:", keyword, "in applications:", applications, "link types:", linkTypes, "jurisdictions:", jurisdictions);
    
    // Simulate API call - replace with actual JIRA/Confluence API calls
    setTimeout(() => {
      const mockResults: SearchResult[] = [
        {
          id: "PROJ-123",
          title: `Bug fix for ${keyword}`,
          type: "jira",
          url: "https://your-domain.atlassian.net/browse/PROJ-123",
          summary: "Critical bug found in the search functionality",
          status: "In Progress",
          createdDate: "2025-01-15",
          application: "JIRA"
        },
        {
          id: "PROJ-124",
          title: `Feature request: ${keyword} enhancement`,
          type: "jira",
          url: "https://your-domain.atlassian.net/browse/PROJ-124",
          summary: "Enhancement request for better user experience",
          status: "Open",
          createdDate: "2025-01-14",
          application: "JIRA"
        },
        {
          id: "DOC-001",
          title: `Documentation for ${keyword}`,
          type: "confluence",
          url: "https://your-domain.atlassian.net/wiki/spaces/DOC/pages/123456",
          summary: "Comprehensive documentation and guidelines",
          createdDate: "2025-01-13",
          application: "Confluence"
        }
      ];
      
      setSearchResults(mockResults);
      setIsLoading(false);
    }, 1000);
  };

  const handleItemClick = (item: SearchResult) => {
    setSelectedItem(item);
    setIsPreviewOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center mb-6">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg">
                <Search className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              RegTech Insight Search
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Discover and explore regulatory content across JIRA tickets, Confluence pages, and compliance links by jurisdiction
            </p>
            
            {/* Feature Icons */}
            <div className="flex justify-center items-center space-x-8 mt-8">
              <div className="flex items-center space-x-2 text-slate-600">
                <Database className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium">JIRA Integration</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600">
                <FileText className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">Confluence Pages</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600">
                <Search className="h-5 w-5 text-purple-500" />
                <span className="text-sm font-medium">Smart Search</span>
              </div>
            </div>
          </div>

          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <Tabs defaultValue="results" className="mt-8">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-white/80 backdrop-blur-sm shadow-lg border-0">
              <TabsTrigger 
                value="results" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
              >
                Search Results
              </TabsTrigger>
              <TabsTrigger 
                value="history" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
              >
                Search History
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="results" className="mt-6">
            <SearchResults 
              results={searchResults}
              isLoading={isLoading}
              onItemClick={handleItemClick}
            />
          </TabsContent>
          
          <TabsContent value="history" className="mt-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-12 text-center border border-white/20">
              <Search className="h-16 w-16 mx-auto mb-4 text-slate-400" />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">Search History</h3>
              <p className="text-slate-500">Your search history will appear here once you start searching</p>
            </div>
          </TabsContent>
        </Tabs>

        <PreviewDialog
          item={selectedItem}
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
        />
      </div>
    </div>
  );
};

export default Index;
