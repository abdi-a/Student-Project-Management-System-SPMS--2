interface StatCardProps {
    title: string;
    value: string | number;
    color?: string;
    icon?: React.ReactNode;
}

export default function StatCard({ title, value, color = 'blue' }: StatCardProps) {
    const colorClasses = {
        blue: 'bg-blue-500',
        green: 'bg-green-500',
        yellow: 'bg-yellow-500',
        red: 'bg-red-500',
        indigo: 'bg-indigo-500',
    };

    return (
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <div className={`p-3 rounded-full ${colorClasses[color as keyof typeof colorClasses] || 'bg-blue-500'} text-white mr-4`}>
               {/* Placeholder Icon */}
               <div className="w-6 h-6 bg-white opacity-20"></div>
            </div>
            <div>
                <p className="text-gray-500 text-sm font-medium">{title}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
        </div>
    );
}