import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JsonMonitorService } from './json-monitor.service';

describe('JsonMonitorService', () => {
  let service: JsonMonitorService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JsonMonitorService],
    });

    // Inject the service and the testing controller
    service = TestBed.inject(JsonMonitorService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that there are no outstanding HTTP requests
    httpTestingController.verify();
  });

  it('should fetch JSON data for multiple files', () => {
    const fileNames = ['file1', 'file2', 'file3'];
    const expectedData = [
      { data: 'data1' },
      { data: 'data2' },
      { data: 'data3' },
    ];

    // Mock HTTP requests for each file
    fileNames.forEach((fileName, index) => {
      const filePath = `assets/JSONmonitors/${fileName}.json`;

      service.getMonitorData([fileName]).subscribe((data) => {
        expect(data).toEqual([expectedData[index]]);
      });

      const req = httpTestingController.expectOne(filePath);
      expect(req.request.method).toBe('GET');

      // Respond with mock data
      req.flush(expectedData[index]);
    });
  });
});