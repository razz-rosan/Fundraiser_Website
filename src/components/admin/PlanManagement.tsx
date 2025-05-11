
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/redux-hooks';
import { addPlan, updatePlan, deletePlan, FundingPlan } from '@/store/slices/fundingSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Pencil, Trash } from 'lucide-react';

const PlanManagement = () => {
  const dispatch = useAppDispatch();
  const { plans } = useAppSelector((state) => state.funding);
  const { toast } = useToast();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<FundingPlan | null>(null);
  const [planToDelete, setPlanToDelete] = useState<FundingPlan | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    amount: 0,
    type: 'monthly' as 'monthly' | 'one-time',
    featured: false,
  });
  
  const handleOpenDialog = (plan?: FundingPlan) => {
    if (plan) {
      setEditingPlan(plan);
      setFormData({
        name: plan.name,
        description: plan.description,
        amount: plan.amount,
        type: plan.type,
        featured: plan.featured,
      });
    } else {
      setEditingPlan(null);
      setFormData({
        name: '',
        description: '',
        amount: 0,
        type: 'monthly',
        featured: false,
      });
    }
    setIsDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingPlan(null);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) : value,
    }));
  };
  
  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      featured: checked,
    }));
  };
  
  const handleTypeChange = (value: 'monthly' | 'one-time') => {
    setFormData((prev) => ({
      ...prev,
      type: value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!formData.name || !formData.description || formData.amount <= 0) {
        throw new Error('Please fill in all required fields with valid values.');
      }
      
      if (editingPlan) {
        // Update existing plan
        dispatch(updatePlan({
          ...editingPlan,
          name: formData.name,
          description: formData.description,
          amount: formData.amount,
          type: formData.type,
          featured: formData.featured,
        }));
        toast({
          title: "Plan Updated",
          description: `"${formData.name}" has been updated successfully.`,
        });
      } else {
        // Add new plan
        dispatch(addPlan({
          id: `plan-${Date.now()}`,
          name: formData.name,
          description: formData.description,
          amount: formData.amount,
          type: formData.type,
          featured: formData.featured,
        }));
        toast({
          title: "Plan Created",
          description: `"${formData.name}" has been created successfully.`,
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
    if (planToDelete) {
      dispatch(deletePlan(planToDelete.id));
      toast({
        title: "Plan Deleted",
        description: `"${planToDelete.name}" has been deleted successfully.`,
      });
      setPlanToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };
  
  const confirmDelete = (plan: FundingPlan) => {
    setPlanToDelete(plan);
    setIsDeleteDialogOpen(true);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif font-bold">Funding Plans</h2>
        <Button onClick={() => handleOpenDialog()} className="flex items-center gap-2">
          <Plus size={16} /> Add New Plan
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id}>
            <CardHeader className="pb-3">
              <CardTitle className="flex justify-between items-start">
                <span>{plan.name}</span>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0" 
                    onClick={() => handleOpenDialog(plan)}
                  >
                    <Pencil size={16} />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50" 
                    onClick={() => confirmDelete(plan)}
                  >
                    <Trash size={16} />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-500 mb-3">{plan.description}</div>
              <div className="mb-2">
                <span className="font-bold text-lg">${plan.amount}</span>
                {plan.type === 'monthly' && <span className="text-sm text-gray-500">/month</span>}
              </div>
              <div className="flex justify-between items-center">
                <span className="px-2 py-1 text-xs rounded-full bg-gray-100">
                  {plan.type === 'monthly' ? 'Monthly' : 'One-time'}
                </span>
                {plan.featured && (
                  <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                    Featured
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Add/Edit Plan Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingPlan ? 'Edit Funding Plan' : 'Add New Funding Plan'}
            </DialogTitle>
            <DialogDescription>
              {editingPlan 
                ? 'Make changes to the selected funding plan below.' 
                : 'Create a new funding plan to offer to donors.'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="name">Plan Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
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
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                min="1"
                step="0.01"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Donation Type</Label>
              <RadioGroup 
                value={formData.type} 
                onValueChange={handleTypeChange as (value: string) => void}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly">Monthly recurring</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="one-time" id="one-time" />
                  <Label htmlFor="one-time">One-time donation</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="featured" 
                checked={formData.featured} 
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="featured">Feature this plan</Label>
            </div>
            
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit">
                {editingPlan ? 'Save Changes' : 'Create Plan'}
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
              Are you sure you want to delete "{planToDelete?.name}"? This action cannot be undone.
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

export default PlanManagement;
