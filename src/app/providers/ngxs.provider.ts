import { EnvironmentProviders, importProvidersFrom } from "@angular/core";
import { NgxsModule } from '@ngxs/store';
import { BoardsState } from "../store/boards/boards.state";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";

export function provideNgxs(): EnvironmentProviders {
  return importProvidersFrom(
    NgxsModule.forRoot([
      BoardsState,
    ]),
    NgxsLoggerPluginModule.forRoot(),
  );
}
