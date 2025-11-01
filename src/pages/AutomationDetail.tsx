import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const AutomationDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const automation = location.state?.automation || {
    title: "Automation",
    description: "Automation description",
  };
  
  const [description, setDescription] = useState(automation.description);

  const handleSave = () => {
    toast({
      title: "Automation saved",
      description: "Your changes have been saved successfully.",
    });
    navigate("/automations");
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="glass-sheet border-b border-border/30 sticky top-0 z-40 pt-safe">
        <div className="max-w-full sm:max-w-lg mx-auto px-5 sm:px-6 py-5 sm:py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/automations")}
                className="rounded-2xl min-h-[44px] min-w-[44px]"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-foreground">{automation.title}</h1>
                <p className="text-sm text-muted-foreground">Edit automation</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-full sm:max-w-lg mx-auto px-5 sm:px-6 py-6 space-y-6">
        {/* Editable Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          <label className="text-sm font-medium text-foreground">
            Automation Description
          </label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what this automation should do..."
            className="min-h-[150px] glass border-border/30 rounded-2xl resize-none"
          />
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            onClick={handleSave}
            className="w-full rounded-2xl gradient-primary shadow-glow min-h-[52px]"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Changes
          </Button>
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-5 space-y-3"
        >
          <h3 className="text-sm font-semibold text-foreground">How it works</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This automation will run based on the triggers you've set. You can customize the description 
            to change the automation's behavior. The AI will understand your instructions and execute them accordingly.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AutomationDetail;
