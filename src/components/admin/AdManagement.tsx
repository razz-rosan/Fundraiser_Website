
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/redux-hooks';
import { addAd, updateAd, deleteAd, Ad } from '@/store/slices/fundingSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Pencil, Trash } from 'lucide-react';

const AdManagement = () => {
  const dispatch = useAppDispatch();
  const { ads, plans } = useAppSelector((state) => state.funding);
  const { toast } = useToast();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);
  const [adToDelete, setAdToDelete] = useState<Ad | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    linkTo: '',
    planId: '',
  });
  
  // Sample image URLs for demo purposes
  const sampleImageUrls = [
    'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1000',
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000',
    'https://images.unsplash.com/photo-1469571486292-b84d52cbd1c4?q=80&w=1000',
  ];
  
  const handleOpenDialog = (ad?: Ad) => {
    if (ad) {
      setEditingAd(ad);
      setFormData({
        title: ad.title,
        description: ad.description || '',
        imageUrl: ad.imageUrl,
        linkTo: ad.linkTo || '',
        planId: ad.planId || '',
      });
    } else {
      setEditingAd(null);
      setFormData({
        title: '',
        description: '',
        imageUrl: sampleImageUrls[0],
        linkTo: '',
        planId: '',
      });
    }
    setIsDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingAd(null);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!formData.title || !formData.imageUrl) {
        throw new Error('Please fill in all required fields.');
      }
      
      const adData = {
        title: formData.title,
        description: formData.description,
        imageUrl: formData.imageUrl,
        linkTo: formData.linkTo,
        planId: formData.planId || undefined,
      };
      
      if (editingAd) {
        // Update existing ad
        dispatch(updateAd({
          ...adData,
          id: editingAd.id,
        }));
        toast({
          title: "Ad Updated",
          description: `"${formData.title}" has been updated successfully.`,
        });
      } else {
        // Add new ad
        dispatch(addAd({
          ...adData,
          id: `ad-${Date.now()}`,
        }));
        toast({
          title: "Ad Created",
          description: `"${formData.title}" has been created successfully.`,
        });
      }
      
      handleCloseDialog();
    } catch (error) {
      let message = 'An error occurred';
      if (error instanceof Error) {
        message = error.message;
      }
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }
  };
  
  const handleDelete = () => {
    if (adToDelete) {
      dispatch(deleteAd(adToDelete.id));
      toast({
        title: "Ad Deleted",
        description: `"${adToDelete.title}" has been deleted successfully.`,
      });
      setAdToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };
  
  const confirmDelete = (ad: Ad) => {
    setAdToDelete(ad);
    setIsDeleteDialogOpen(true);
  };
  
  const handleSelectImage = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      imageUrl: url,
    }));
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-bold">Campaign Ads</h2>
        <Button onClick={() => handleOpenDialog()} className="flex items-center gap-2">
          <Plus size={16} /> Add New Ad
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ads.map((ad) => (
          <Card key={ad.id}>
            <div className="h-48 w-full overflow-hidden">
              <img 
                src={ad.imageUrl} 
                alt={ad.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader className="pb-3">
              <CardTitle className="flex justify-between items-start">
                <span>{ad.title}</span>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0" 
                    onClick={() => handleOpenDialog(ad)}
                  >
                    <Pencil size={16} />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50" 
                    onClick={() => confirmDelete(ad)}
                  >
                    <Trash size={16} />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {ad.description && <p className="text-sm text-gray-500 mb-4">{ad.description}</p>}
              
              <div className="text-sm">
                {ad.planId && (
                  <div className="mb-1">
                    <span className="font-medium">Linked to plan: </span>
                    {plans.find(p => p.id === ad.planId)?.name || 'Unknown plan'}
                  </div>
                )}
                {ad.linkTo && (
                  <div>
                    <span className="font-medium">Custom link: </span>
                    {ad.linkTo}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Add/Edit Ad Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingAd ? 'Edit Campaign Ad' : 'Add New Campaign Ad'}
            </DialogTitle>
            <DialogDescription>
              {editingAd 
                ? 'Make changes to the selected campaign ad below.' 
                : 'Create a new campaign ad to promote funding plans.'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="title">Ad Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Select Image</Label>
              <div className="grid grid-cols-3 gap-2">
                {sampleImageUrls.map((url) => (
                  <div 
                    key={url} 
                    className={`
                      h-20 border rounded cursor-pointer overflow-hidden
                      ${formData.imageUrl === url ? 'ring-2 ring-primary' : ''}
                    `}
                    onClick={() => handleSelectImage(url)}
                  >
                    <img src={url} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL (or choose from above)</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="planId">Link to Funding Plan (Optional)</Label>
              <Select 
                value={formData.planId} 
                onValueChange={(value) => handleSelectChange('planId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No linked plan</SelectItem>
                  {plans.map((plan) => (
                    <SelectItem key={plan.id} value={plan.id}>
                      {plan.name} (${plan.amount}{plan.type === 'monthly' ? '/month' : ''})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="linkTo">Custom Link URL (Optional)</Label>
              <Input
                id="linkTo"
                name="linkTo"
                value={formData.linkTo}
                onChange={handleChange}
                placeholder="e.g., /plans or https://example.com"
              />
            </div>
            
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit">
                {editingAd ? 'Save Changes' : 'Create Ad'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{adToDelete?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="button" 
              variant="destructive" 
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdManagement;
