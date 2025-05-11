
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/redux-hooks';
import { updateGoal, FundingGoal } from '@/store/slices/fundingSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Pencil } from 'lucide-react';

const GoalManagement = () => {
  const dispatch = useAppDispatch();
  const { goals } = useAppSelector((state) => state.funding);
  const { toast } = useToast();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<FundingGoal | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: new Date().getFullYear(),
    amount: 0,
    current: 0,
  });
  
  const handleOpenDialog = (goal: FundingGoal) => {
    setEditingGoal(goal);
    setFormData({
      title: goal.title,
      description: goal.description || '',
      year: goal.year,
      amount: goal.amount,
      current: goal.current,
    });
    setIsDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ['year', 'amount', 'current'].includes(name) 
        ? parseFloat(value) 
        : value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!formData.title || formData.amount <= 0) {
        throw new Error('Please fill in all required fields with valid values.');
      }
      
      if (editingGoal) {
        // Update existing goal
        dispatch(updateGoal({
          ...editingGoal,
          title: formData.title,
          description: formData.description,
          year: formData.year,
          amount: formData.amount,
          current: formData.current,
        }));
        toast({
          title: "Goal Updated",
          description: `"${formData.title}" has been updated successfully.`,
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
  
  return (
    <div>
      <h2 className="text-2xl font-serif font-bold mb-6">Funding Goals</h2>
      
      <div className="grid grid-cols-1 gap-6">
        {goals.map((goal) => {
          const percentage = (goal.current / goal.amount) * 100;
          const formattedPercentage = Math.min(percentage, 100).toFixed(1);
          
          return (
            <Card key={goal.id}>
              <CardHeader className="pb-3">
                <CardTitle className="flex justify-between items-start">
                  <span>{goal.title}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0" 
                    onClick={() => handleOpenDialog(goal)}
                  >
                    <Pencil size={16} />
                    <span className="sr-only">Edit</span>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-2 text-sm">
                  <span>Year: {goal.year}</span>
                  <span>{formattedPercentage}% Complete</span>
                </div>
                
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
                  <div 
                    className="h-full bg-secondary-green"
                    style={{ width: `${formattedPercentage}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between mb-4 text-sm">
                  <div>
                    <div className="text-gray-500">Current</div>
                    <div className="font-bold">${goal.current.toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-500">Goal</div>
                    <div className="font-bold">${goal.amount.toLocaleString()}</div>
                  </div>
                </div>
                
                {goal.description && (
                  <p className="text-sm text-gray-500">{goal.description}</p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {/* Edit Goal Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Funding Goal</DialogTitle>
            <DialogDescription>
              Make changes to the funding goal below.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="title">Goal Title</Label>
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
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                name="year"
                type="number"
                min="2020"
                max="2050"
                value={formData.year}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Goal Amount ($)</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                min="1"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="current">Current Amount ($)</Label>
              <Input
                id="current"
                name="current"
                type="number"
                min="0"
                value={formData.current}
                onChange={handleChange}
                required
              />
            </div>
            
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit">
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GoalManagement;
