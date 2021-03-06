import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressListComponent } from './address-list.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AddressDisplayComponent } from '@app/shared/components/address-display/address-display.component';
import { PhoneFormatPipe } from '@app/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { MeService } from '@ordercloud/angular-sdk';
import { AddressFormComponent } from '@app/shared/components/address-form/address-form.component';

describe('AddressListComponent', () => {
  let component: AddressListComponent;
  let fixture: ComponentFixture<AddressListComponent>;
  const toastrService = { success: jasmine.createSpy('success') };
  const meService = {
    DeleteAddress: jasmine.createSpy('DeleteAddress').and.returnValue(of(null)),
    ListAddresses: jasmine.createSpy('ListAddresses').and.returnValue(of(null))
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PhoneFormatPipe,
        AddressDisplayComponent,
        FaIconComponent,
        AddressListComponent,
        AddressFormComponent,
      ],
      imports: [
        ReactiveFormsModule,
      ],
      providers: [
        { provide: MeService, useValue: meService },
        { provide: ToastrService, useValue: toastrService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      spyOn(component as any, 'reloadAddresses');
      component.ngOnInit();
    });
    it('should call reload addresses', () => {
      expect(component['reloadAddresses']).toHaveBeenCalled();
    });
  });

  describe('showAddress', () => {
    beforeEach(() => {
      component.showEdit = false;
      component.currentAddress = { ID: 'mockBuyerAddress' };
      component['showAddAddress']();
    });
    it('should display edit mode', () => {
      expect(component.showEdit).toBe(true);
    });
    it('should clear out current address', () => {
      expect(component.currentAddress).toBe(null);
    });
  });

  describe('showEditAddress', () => {
    const mockEditAddress = { ID: 'mockEditAddress' };
    beforeEach(() => {
      component.showEdit = false;
      component.currentAddress = null;
      component['showEditAddress'](mockEditAddress);
    });
    it('should display edit mode', () => {
      expect(component.showEdit).toBe(true);
    });
    it('should show edit address', () => {
      expect(component.currentAddress).toBe(mockEditAddress);
    });
  });

  describe('hideEditorAdd', () => {
    beforeEach(() => {
      spyOn(component as any, 'reloadAddresses');
      component.showEdit = false;
      component.currentAddress = { ID: 'mockBuyerAddress' };
      component['hideEditOrAdd']();
    });
    it('should hide edit mode', () => {
      expect(component.showEdit).toBe(false);
    });
    it('should clear out edit address', () => {
      expect(component.currentAddress).toBe(null);
    });
    it('should reload addresses', () => {
      expect(component['reloadAddresses']).toHaveBeenCalled();
    });
  });

  describe('deleteAddress', () => {
    beforeEach(() => {
      spyOn(component as any, 'reloadAddresses');
      component['deleteAddress']({ ID: 'mockAddress' });
    });
    it('should call meService.DeleteAddress', () => {
      expect(meService.DeleteAddress).toHaveBeenCalledWith('mockAddress');
    });
    it('should reload addresses', () => {
      expect(component['reloadAddresses']).toHaveBeenCalled();
    });
  });

  describe('reloadAddresses', () => {
    beforeEach(() => {
      component['reloadAddresses']();
    });
    it('should call meService.ListAddresses', () => {
      expect(meService.ListAddresses).toHaveBeenCalled();
    });
  });
});
