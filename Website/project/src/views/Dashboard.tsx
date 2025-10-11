import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import ScatterPlot from '../components/ScatterPlot';
import EventInspector from '../components/EventInspector';
import { Event } from '../types';

export default function Dashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'nuclear_recoil' | 'electronic_recoil'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateMockData();
  }, []);

  const generateMockData = () => {
    const mockEvents: Event[] = [];
    for (let i = 1; i <= 200; i++) {
      const isNuclear = Math.random() > 0.6;
      const s1 = isNuclear
        ? Math.random() * 50 + 10
        : Math.random() * 100 + 20;
      const s2 = isNuclear
        ? s1 * (Math.random() * 30 + 10)
        : s1 * (Math.random() * 100 + 50);

      mockEvents.push({
        id: `EV${String(i).padStart(5, '0')}`,
        s1,
        s2,
        s2_s1_ratio: s2 / s1,
        recoil_energy: Math.random() * 50 + 1,
        x: Math.random() * 40 - 20,
        y: Math.random() * 40 - 20,
        z: Math.random() * 100 - 50,
        classification: isNuclear ? 'nuclear_recoil' : 'electronic_recoil',
        true_label: isNuclear ? 'WIMP' : 'Background',
        confidence: Math.random() * 0.3 + 0.7,
        reasoning: isNuclear
          ? 'Low S2/S1 ratio indicates nuclear recoil. Energy and position consistent with WIMP interaction.'
          : 'High S2/S1 ratio characteristic of electronic recoil. Likely background radiation event.',
      });
    }
    setEvents(mockEvents);
    setLoading(false);
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || event.classification === filterType;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#00d4ff] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#b0bec5]">Loading event data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-4">Event Classification Dashboard</h2>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#b0bec5]" />
              <input
                type="text"
                placeholder="Search by Event ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 glass-card text-white placeholder-[#b0bec5] focus:outline-none focus:border-[#00d4ff] transition-colors"
              />
            </div>

            <div className="flex items-center space-x-2 glass-card px-4">
              <Filter className="w-5 h-5 text-[#b0bec5]" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="bg-transparent text-white py-3 focus:outline-none cursor-pointer"
              >
                <option value="all" className="bg-[#132f4c]">All Events</option>
                <option value="nuclear_recoil" className="bg-[#132f4c]">Nuclear Recoil</option>
                <option value="electronic_recoil" className="bg-[#132f4c]">Electronic Recoil</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ScatterPlot
              events={filteredEvents}
              onEventClick={setSelectedEvent}
              selectedEventId={selectedEvent?.id}
            />
          </div>

          <div className="lg:col-span-1">
            <EventInspector event={selectedEvent} />
          </div>
        </div>

        <div className="mt-6 glass-card p-4 text-center">
          <p className="text-sm text-[#b0bec5]">
            Showing {filteredEvents.length} of {events.length} events
          </p>
        </div>
      </div>
    </div>
  );
}
