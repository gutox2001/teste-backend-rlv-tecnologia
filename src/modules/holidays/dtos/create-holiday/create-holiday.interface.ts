export interface ICreateHoliday {
    name: string;
    date: string;
    ibgeCode: string;
    type: 'NACIONAL' | 'ESTADUAL' | 'MUNICIPAL';
    cityId?: number;
    stateId?: number;
}