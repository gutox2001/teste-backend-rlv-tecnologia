import { forwardRef, Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { HolidaysModule } from '../holidays/holidays.module';

import { stateProviders } from '../database/database.providers';
import { StatesRepository } from './repositories/implementations/states';

import { StatesController } from './states.controller';

import { PostStateService } from './services/post-state/post-state.service';
import { DeleteStateService } from './services/delete-state/delete-state.service';
import { DeleteStatesService } from './services/delete-states/delete-states.service';
import { GetStatesService } from './services/get-states/get-states.service';
import { GetStateService } from './services/get-state/get-state.service';
import { PostStatesService } from './services/post-states/post-states.service';

@Module({
	imports: [DatabaseModule, forwardRef(() => HolidaysModule)],
	providers: [
		...stateProviders,
		StatesRepository,
		PostStateService,
		DeleteStateService,
		DeleteStatesService,
		GetStatesService,
		GetStateService,
		PostStatesService,
	],
	controllers: [StatesController],
	exports: [StatesRepository],
})
export class StatesModule {}
