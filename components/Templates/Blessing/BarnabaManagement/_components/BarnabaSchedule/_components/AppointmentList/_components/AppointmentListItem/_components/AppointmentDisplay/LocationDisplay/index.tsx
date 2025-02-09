import {MapPinIcon} from "@heroicons/react/24/outline";

export const LocationDisplay = ({place}: {place: string}) => (
  <div className="flex items-center space-x-2">
    <MapPinIcon className="h-4 w-4" />
    <span className="text-sm">{place}</span>
  </div>
);
