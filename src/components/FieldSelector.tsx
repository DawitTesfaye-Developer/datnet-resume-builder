import { useState, useMemo } from 'react';
import { Check, Search } from 'lucide-react';
import { FieldCategory, fieldCategories } from '@/types/resume';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

interface FieldSelectorProps {
  selected: FieldCategory;
  onSelect: (field: FieldCategory) => void;
}

const FieldSelector = ({ selected, onSelect }: FieldSelectorProps) => {
  const [search, setSearch] = useState('');
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const groups = useMemo(() => {
    const filtered = fieldCategories.filter(
      (f) =>
        f.label.toLowerCase().includes(search.toLowerCase()) ||
        f.description.toLowerCase().includes(search.toLowerCase()) ||
        f.group.toLowerCase().includes(search.toLowerCase())
    );
    const groupMap: Record<string, typeof fieldCategories> = {};
    filtered.forEach((f) => {
      if (!groupMap[f.group]) groupMap[f.group] = [];
      groupMap[f.group].push(f);
    });
    return groupMap;
  }, [search]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Select Your Field</h2>
        <p className="text-muted-foreground">We'll optimize your template and suggestions for your industry</p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search fields (e.g. nurse, driver, teacher...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Group Filter Pills */}
      {!search && (
        <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
          <button
            onClick={() => setActiveGroup(null)}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium transition-all border",
              !activeGroup ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50"
            )}
          >
            All Fields
          </button>
          {Object.keys(groups).map((group) => (
            <button
              key={group}
              onClick={() => setActiveGroup(activeGroup === group ? null : group)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium transition-all border",
                activeGroup === group ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50"
              )}
            >
              {group}
            </button>
          ))}
        </div>
      )}

      {/* Field Grid */}
      <div className="max-w-5xl mx-auto space-y-6">
        {Object.entries(groups)
          .filter(([group]) => !activeGroup || group === activeGroup)
          .map(([group, fields]) => (
            <div key={group}>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">{group}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {fields.map(({ value, label, icon, description }) => (
                  <button
                    key={value}
                    onClick={() => onSelect(value)}
                    className={cn(
                      "relative p-3 rounded-xl border-2 text-left transition-all duration-200 group",
                      selected === value
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border bg-card hover:border-primary/50 hover:shadow-sm"
                    )}
                  >
                    {selected === value && (
                      <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                    <div className="text-2xl mb-1">{icon}</div>
                    <h3 className="font-medium text-xs leading-tight mb-0.5">{label}</h3>
                    <p className="text-[10px] text-muted-foreground line-clamp-1">{description}</p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        {Object.keys(groups).length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No fields found for "{search}"</p>
            <button onClick={() => setSearch('')} className="text-primary underline mt-2 text-sm">Clear search</button>
          </div>
        )}
      </div>

      {selected && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Selected: <span className="font-medium text-foreground">
              {fieldCategories.find(f => f.value === selected)?.icon} {fieldCategories.find(f => f.value === selected)?.label}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default FieldSelector;
