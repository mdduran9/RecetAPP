import { TestBed } from '@angular/core/testing';
import { LoginGuard } from './login.guard';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';

describe('LoginGuard', () => {
  let guard: LoginGuard;
  let mockStorage: jasmine.SpyObj<Storage>;
  let mockNavCtrl: jasmine.SpyObj<NavController>;

  beforeEach(() => {
    // Crear espías para los servicios
    mockStorage = jasmine.createSpyObj('Storage', ['get']);
    mockNavCtrl = jasmine.createSpyObj('NavController', ['navigateRoot']);

    TestBed.configureTestingModule({
      providers: [
        LoginGuard,
        { provide: Storage, useValue: mockStorage },
        { provide: NavController, useValue: mockNavCtrl }
      ]
    });
    guard = TestBed.inject(LoginGuard);
  });

  it('should return true if user is logged in', async () => {
    // Simular el valor que devuelve el storage
    mockStorage.get.and.returnValue(Promise.resolve(true));

    const result = await guard.canActivate();
    expect(result).toBeTrue();
  });

  it('should navigate to login if user is not logged in', async () => {
    // Simular el valor que devuelve el storage
    mockStorage.get.and.returnValue(Promise.resolve(false));

    const result = await guard.canActivate();
    expect(result).toBeFalse();
    expect(mockNavCtrl.navigateRoot).toHaveBeenCalledWith('/login');
  });
});