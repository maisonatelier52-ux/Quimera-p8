"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FooterSettingsPage() {
  const [formData, setFormData] = useState<any>({
    siteDescription: "",
    copyrightText: "",
    socialLinks: {
      instagram: "",
      youtube: "",
      substack: "",
      twitter: "",
      facebook: "",
    },
    footerBgColor: "#09365E"
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NODE_ENV === 'production' ? 'https://quimera-backend-one.vercel.app' : 'http://127.0.0.1:5000'}/api/footer`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => {
        if (res.status === 401) {
          router.push("/admin/login");
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data) {
          const defaultColumn2Links = [
            { title: "About Us", externalUrl: "/about-us" },
            { title: "Authors", externalUrl: "/authors" },
            { title: "Privacy Policy", externalUrl: "/privacy-policy" },
            { title: "Terms & Conditions", externalUrl: "/terms-and-conditions" },
            { title: "Contact Us", externalUrl: "/contact-us" },
            { title: "Legal", externalUrl: "/legal" },
            { title: "Right of Reply", externalUrl: "/right-of-reply" },
            { title: "Sourcing & Methodology", externalUrl: "/source-methodology" },
            { title: "Ownership & Funding", externalUrl: "/ownership-funding" },
            { title: "Editorial Policy", externalUrl: "/editorial-policy" },
            { title: "Corrections Policy", externalUrl: "/corrections-policy" },
            { title: "Advertising Policy", externalUrl: "/advertising-policy" }
          ];

          const defaultColumn1Links = [
            { title: "Politics", externalUrl: "/category/politics" },
            { title: "Business", externalUrl: "/category/business" },
            { title: "Tech", externalUrl: "/category/tech" },
            { title: "Sports", externalUrl: "/category/sports" }
          ];

          setFormData({
            ...data,
            socialLinks: data.socialLinks || formData.socialLinks,
            column1Links: data.column1Links?.length > 0 ? data.column1Links : defaultColumn1Links,
            column2Links: data.column2Links?.length > 0 ? data.column2Links : defaultColumn2Links,
            footerBgColor: data.footerBgColor || "#09365E"
          });
        }
        setLoading(false);
      })
      .catch(console.error);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NODE_ENV === 'production' ? 'https://quimera-backend-one.vercel.app' : 'http://127.0.0.1:5000'}/api/footer`, {
        method: "POST", // The backend uses POST for updateFooter based on the controller
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert("Footer settings updated successfully!");
      } else {
        alert("Failed to update footer settings.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred.");
    }
  };

    const handleLinkChange = (column: 'column1Links' | 'column2Links', index: number, field: string, value: string) => {
      const updatedLinks = [...formData[column]];
      updatedLinks[index] = { ...updatedLinks[index], [field]: value };
      setFormData({ ...formData, [column]: updatedLinks });
    };

    const addLink = (column: 'column1Links' | 'column2Links') => {
      setFormData({
        ...formData,
        [column]: [...(formData[column] || []), { title: "", externalUrl: "" }]
      });
    };

    const removeLink = (column: 'column1Links' | 'column2Links', index: number) => {
      const updatedLinks = [...formData[column]];
      updatedLinks.splice(index, 1);
      setFormData({ ...formData, [column]: updatedLinks });
    };

  if (loading) return <div className="p-8">Loading settings...</div>;

  return (
    <div className="space-y-6 max-w-4xl pb-12">
      <h2 className="text-2xl font-bold text-gray-900">Footer Settings</h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
        
        {/* Color Settings */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Theme Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Footer Background Color</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="color"
                  value={formData.footerBgColor}
                  onChange={(e) => setFormData({ ...formData, footerBgColor: e.target.value })}
                  className="w-10 h-10 p-0 border-0 rounded cursor-pointer"
                />
                <input 
                  type="text"
                  value={formData.footerBgColor}
                  onChange={(e) => setFormData({ ...formData, footerBgColor: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
          <textarea 
            value={formData.siteDescription || ''}
            onChange={(e) => setFormData({ ...formData, siteDescription: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
          <p className="text-xs text-gray-500 mt-1">Displayed in the left column of the footer.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Copyright Text</label>
          <input 
            type="text"
            value={formData.copyrightText || ''}
            onChange={(e) => setFormData({ ...formData, copyrightText: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Newsroom Links */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">Newsroom Links</h3>
            <button type="button" onClick={() => addLink('column1Links')} className="text-sm bg-gray-100 px-3 py-1.5 rounded hover:bg-gray-200 font-medium">+ Add Link</button>
          </div>
          <div className="space-y-3">
            {formData.column1Links?.map((link: any, index: number) => (
              <div key={index} className="flex gap-3 items-center">
                <input 
                  type="text"
                  placeholder="Link Title (e.g. About Us)"
                  value={link.title}
                  onChange={(e) => handleLinkChange('column1Links', index, 'title', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm"
                  required
                />
                <input 
                  type="text"
                  placeholder="URL (e.g. /about-us)"
                  value={link.externalUrl}
                  onChange={(e) => handleLinkChange('column1Links', index, 'externalUrl', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm"
                  required
                />
                <button type="button" onClick={() => removeLink('column1Links', index)} className="text-red-500 hover:text-red-700 font-bold px-2">✕</button>
              </div>
            ))}
            {(!formData.column1Links || formData.column1Links.length === 0) && (
              <p className="text-sm text-gray-500 italic">No links added. Click "+ Add Link" to create one.</p>
            )}
          </div>
        </div>

        {/* Standards Links */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900">Standards Links</h3>
            <button type="button" onClick={() => addLink('column2Links')} className="text-sm bg-gray-100 px-3 py-1.5 rounded hover:bg-gray-200 font-medium">+ Add Link</button>
          </div>
          <div className="space-y-3">
            {formData.column2Links?.map((link: any, index: number) => (
              <div key={index} className="flex gap-3 items-center">
                <input 
                  type="text"
                  placeholder="Link Title (e.g. Code of Conduct)"
                  value={link.title}
                  onChange={(e) => handleLinkChange('column2Links', index, 'title', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm"
                  required
                />
                <input 
                  type="text"
                  placeholder="URL (e.g. /code-of-conduct)"
                  value={link.externalUrl}
                  onChange={(e) => handleLinkChange('column2Links', index, 'externalUrl', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm"
                  required
                />
                <button type="button" onClick={() => removeLink('column2Links', index)} className="text-red-500 hover:text-red-700 font-bold px-2">✕</button>
              </div>
            ))}
            {(!formData.column2Links || formData.column2Links.length === 0) && (
              <p className="text-sm text-gray-500 italic">No links added. Click "+ Add Link" to create one.</p>
            )}
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Social Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Instagram URL</label>
              <input 
                type="url"
                value={formData.socialLinks?.instagram || ''}
                onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, instagram: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://instagram.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">YouTube URL</label>
              <input 
                type="url"
                value={formData.socialLinks?.youtube || ''}
                onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, youtube: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://youtube.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Substack URL</label>
              <input 
                type="url"
                value={formData.socialLinks?.substack || ''}
                onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, substack: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://substack.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Twitter/X URL</label>
              <input 
                type="url"
                value={formData.socialLinks?.twitter || ''}
                onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, twitter: e.target.value } })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://twitter.com/..."
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <button 
            type="submit"
            className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Footer Settings
          </button>
        </div>
      </form>
    </div>
  );
}
