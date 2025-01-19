import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { IntroGuard } from './intro.guard';

describe('IntroGuard', () => {
  let guard: IntroGuard;
  let routerSpy: jasmine.SpyObj<Router>;
  let storageSpy: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    // Crear mocks para Router y Storage
    const routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const storageMock = jasmine.createSpyObj('Storage', ['get']);

    TestBed.configureTestingModule({
      providers: [
        IntroGuard,
        { provide: Router, useValue: routerMock },
        { provide: Storage, useValue: storageMock },
      ],
    });

    // Obtener instancias del guard y los mocks
    guard = TestBed.inject(IntroGuard);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    storageSpy = TestBed.inject(Storage) as jasmine.SpyObj<Storage>;
  });

  it('should be created', () => {
    // Verifica que el guard se crea correctamente
    expect(guard).toBeTruthy();
  });

  it('should return true if "viLaIntro" is true in storage', async () => {
    // Simula que el almacenamiento devuelve "true"
    storageSpy.get.and.returnValue(Promise.resolve(true));

    const result = await guard.canActivate();

    // Verifica que permite el acceso y no redirige
    expect(result).toBeTrue();
    expect(routerSpy.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should navigate to /intro if "viLaIntro" is false in storage', async () => {
    // Simula que el almacenamiento devuelve "false"
    storageSpy.get.and.returnValue(Promise.resolve(false));

    const result = await guard.canActivate();

    // Verifica que no permite el acceso y redirige a "/intro"
    expect(result).toBeFalse();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/intro');
  });
});