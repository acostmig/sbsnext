export default function Services() {
    const services = [
        { title: "Test Automation", description: "High-quality home building and renovations." },
        { title: "Test Automation Tools", description: "High-quality home building and renovations." },
        { title: "Quality Assurance", description: "Expert commercial construction services." },
        { title: "Software Development", description: "Expert commercial construction services." },
    ];

    return (
        <div className="mx-auto p-5 max-w-6xl">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <div className="flex flex-wrap gap-4">
                {services.map((service) => (
                    <div key={service.title} className="w-80 h-72 p-6 shadow-lg border rounded-lg flex flex-col justify-between">
                        <h3 className="text-xl font-semibold">{service.title}</h3>
                        <p className="text-gray-600">{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
