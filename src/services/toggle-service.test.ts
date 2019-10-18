import { toggles } from "../data";
import { fetchAll, find } from "./toggle-service";

describe('Toggle Service', function () {
    it('fetchAll should return all toggles', function () {
        const result = fetchAll();
        expect(result).toEqual(toggles);
    })

    it('find should return toggle with specific id', function() {
        const result =  find(1);
        const expected = { id: 1, name: "Feature A", enabled: true, workspace_id: 1 , dependsOn: []}
        expect(result).toEqual(expected)
    })
    
});

