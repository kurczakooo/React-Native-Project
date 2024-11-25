import { writeFileSync } from 'fs';

// this little maneuver's gonna cost us 51 years
import { endpoints } from './debug-database';

writeFileSync('database.json', JSON.stringify(endpoints, null, '\t'));
