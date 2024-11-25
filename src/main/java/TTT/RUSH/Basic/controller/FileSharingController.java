package TTT.RUSH.Basic.controller;

import TTT.RUSH.JDBC.entity.FileSharingInfo;
import TTT.RUSH.Basic.service.FileSharingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/file-sharing")
public class FileSharingController {

    @Autowired
    private FileSharingService fileSharingService;

    @GetMapping("/all")
    public List<FileSharingInfo> getAllFileSharingInfo() {
        return fileSharingService.getAllFileSharingInfo();
    }

    @GetMapping("/party/{partyId}")
    public List<FileSharingInfo> getFileSharingInfoByPartyId(@PathVariable Long partyId) {
        return fileSharingService.getFileSharingInfoByPartyId(partyId);
    }

    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("partyId") Long partyId) {
        try {
            fileSharingService.saveFile(file, partyId);
            return "File uploaded successfully!";
        } catch (IOException e) {
            return "Error occurred while uploading file: " + e.getMessage();
        }
    }

    @GetMapping("/download/{fileId}")
    public ResponseEntity<Resource> downloadFile(@RequestParam("fileId") Long fileId) {
        try{
            return fileSharingService.downloadFile(fileId);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/file")
    public FileSharingInfo getFileByFileName(@RequestParam String fileName) {
        return fileSharingService.getFileByFileName(fileName);
    }

    @DeleteMapping("/delete/{fileId}")
    public String deleteFile(@PathVariable Long fileId) {
        try {
            fileSharingService.deleteFile(fileId);
            return "File deleted successfully!";
        } catch (IllegalArgumentException e) {
            return e.getMessage();
        }
    }
}
