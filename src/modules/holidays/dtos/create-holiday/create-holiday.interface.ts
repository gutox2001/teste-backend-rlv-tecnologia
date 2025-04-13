export interface ICreateHoliday {
    name: string;
    date: string;
    type: 'NACIONAL' | 'ESTADUAL' | 'MUNICIPAL';
    cityId?: number;
    stateId?: number;
}