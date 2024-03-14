import { EnvironmentProviders, importProvidersFrom } from "@angular/core";
import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { BoardsState } from "../store/boards/boards.state";

export function provideNgxs(): EnvironmentProviders {
  return importProvidersFrom(
    NgxsModule.forRoot([
      BoardsState,
    ]),
    NgxsRouterPluginModule.forRoot(),
  );
}
