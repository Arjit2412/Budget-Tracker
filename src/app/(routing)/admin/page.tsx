import NavigationCard from "@/components/NavigationCard";

export default function Admin(){
    return (
        <>
        <h1>Admin Page</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
                <NavigationCard title="Income" image="/placeholder.svg" href="/admin/income"/>
                <NavigationCard title="Ministry" image="/placeholder.svg" href="/admin/ministry"/>
                <NavigationCard title="Person" image="/placeholder.svg" href="/admin/person"/>
                <NavigationCard title="Project" image="/placeholder.svg" href="/admin/project"/>
                <NavigationCard title="Scheme" image="/placeholder.svg" href="/admin/scheme"/>
                <NavigationCard title="State" image="/placeholder.svg" href="/admin/state"/>
                <NavigationCard title="Expenditure" image="/placeholder.svg" href="/admin/expenditure"/>
                <NavigationCard title="Local" image="/placeholder.svg" href="/admin/local"/>
            </div>
        </>
    )
}