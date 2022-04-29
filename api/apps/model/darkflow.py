from darkflow.net.build import TFNet
import cv2
import os
import json

class PostureDetector:
    def __init__(self):
        # model path
        cwd = os.getcwd()
        self.path = "/usr/src/app/"
        #loading multiple frames into tiny-yolo-voc model, model can be configured
        self.options = {"pbLoad": self.path + "/apps/model/PostureDetection_model/tiny-yolo-voc-custom.pb",
                        "metaLoad": self.path + "/apps/model/PostureDetection_model/tiny-yolo-voc-custom.meta",
                        "threshold": 0.4}
        self.tfnet = TFNet(self.options)
        
    def detect(self, input_data):
        self.frame = cv2.imread(input_data[1:])
        
        self.results = self.tfnet.return_predict(self.frame)
        
        for result in self.results:
            result['confidence'] = str(result['confidence'])
       
        return json.loads(json.dumps(self.results))
