<?php
/*
 * Chú ý: Tên các methods cần đúng là read (bắt buộc] và create,update,restore,
 * destroy (không bắt buộc] nếu muốn sử dụng các method này cho Ext.Direct
 * Có thể dùng thêm các methods khác nhưng không được trùng tên với methods 
 * có sẵn của Ext.data.proxy.Proxy.
 * 
 * Mỗi phần tử của $API có dạng
 *   <Tên class> => [
 * 						<method1> => 0, 	//không cần kiểm tra quyền sử dụng
 * 						<method2> => 'abc'	//kiểm tra user hiện tại có quyền 
 * 											//abc hay không?
 * 					]
 */
$API = [
	'Question' => [
		'create'	=> 'question-create',
		'read'		=> 'question-read',
		'update'	=> 'question-update',
		'destroy'	=> 'question-destroy',
		'share'		=> 'question-share',
		'duplicate'	=> 'question-duplicate',
		'mapping_coi_q' => 'question-mapping_coi_q'// để hiển thị button trên toolbar
	],
	'Qco_map' => [
		'mapping_coi_q' => 'qcomap-mapping'//để chạy lệnh này
	],
	'Umi_peoi_map' => [
		'mapping' => 'upm-mapping'
	],
	'Course' => [
		'create'	=> 'course-create',
		'read'		=> 'course-read',
		'update'	=> 'course-update',
		'destroy'	=> 'course-destroy',
		'content'   => 'course-content',
		'outcome'	=> 'course-outcome',
		'trcor'		=> 'course-trcor',
		'mapping'	=> 'course-mapping'
	],
	'Question_content_map' => [
		'mapping_cc_q' => 'qcm-mapping'
	],
	'Course_outcome' => [
		'create'	=> 'co-create',
		'read'		=> 'co-read',
		'update'	=> 'co-update',
		'destroy'	=> 'co-destroy'
	],
	'Course_outcome_item' => [
		'create'	=> 'coi-create',
		'read'		=> 'coi-read',
		'update'	=> 'coi-update',
		'destroy'	=> 'coi-destroy'
	],
	'Student_outcome' => [
		'create'	=> 'so-create',
		'read'		=> 'so-read',
		'update'	=> 'so-update',
		'destroy'	=> 'so-destroy'
	],
	'Student_outcome_item' => [
		'create'	=> 'soi-create',
		'read'		=> 'soi-read',
		'update'	=> 'soi-update',
		'destroy'	=> 'soi-destroy'
	],
	'Peo' => [
		'create'	=> 'peo-create',
		'read'		=> 'peo-read',
		'update'	=> 'peo-update',
		'destroy'	=> 'peo-destroy'
	],
	'Peo_item' => [
		'create'	=> 'peoi-create',
		'read'		=> 'peoi-read',
		'update'	=> 'peoi-update',
		'destroy'	=> 'peoi-destroy'
	],
	'CCOItemMap' => [
		'read'		=> 'ccoiitemmap-read',
		'update'	=> 'ccoiitemmap-update',
		'mapping_coi_cc'=> 'ccoiitemmap-mapping'
	],
	'Coi_soi_map' => [
		'mapping'	=> 'coisoimap-mapping',
	],
	'Peoi_soi_map' => [
		'mapping'	=> 'peoi_soi_map-mapping',
	],
	'MappingCC2COI' => [
		'read'		=> 'mappingcc2coi-read',
		'prepare'	=> 'mappingcc2coi-prepare'
	],
	'MappingQ2COI' => [
		'read'		=> 'mappingq2coi-read',
		'prepare'	=> 'mappingq2coi-prepare'
	],
	'TRCOR' => [
		'read'		=> 'trcor-read',
		'chart'		=> 'trcor-chart',
		'prepare'	=> 'trcor-prepare'
	],
	'CC_CO_R4T' => [
		'read'		=> 'cc_co_r4t-read',
		'prepare'	=> 'cc_co_r4t-prepare'
	],
	'CC_CO_R4TR' => [
		'read'		=> 'cc_co_r4tr-read',
		'chart'		=> 'cc_co_r4tr-chart',
		'prepare'	=> 'cc_co_r4tr-prepare'
	],
	'CO_SO_R4TR' => [
		'read'		=> 'co_so_r4tr-read',
		'chart'		=> 'co_so_r4tr-chart',
		'prepare'	=> 'co_so_r4tr-prepare'
	],
	'Course_SO_R4TR' => [
		'chart'		=> 'course_so_r4tr-chart',
		'chartdetail'		=> 'course_so_r4tr-chartdetail',
		'read'		=> 'course_so_r4tr-read',
		'prepare'	=> 'course_so_r4tr-prepare'
	],
	'MappingCOI2SOI' => [
		'read'		=> 'mappingcoi2soi-read',
		'prepare'	=> 'mappingcoi2soi-prepare'
	],
	'MappingSOPEO' => [
		'read'		=> 'mappingsopeo-read',
		'prepare'	=> 'mappingsopeo-prepare'
	],
	'MappingPEO2UM' => [
		'read'		=> 'mappingpeo2um-read',
		'prepare'	=> 'mappingpeo2um-prepare'
	],
	'ListCSO' => [
		'read'		=> 'listcso-read',
		'prepare'	=> 'listcso-prepare'
	],
	'MappingCC2SOI' => [
		'read'		=> 'mappingcc2soi-read',
		'prepare'	=> 'mappingcc2soi-prepare'
	],
	'Cco_map' => [
		'create'	=> 'ccomap-create',
		'read'		=> 'ccomap-read',
		'update'	=> 'ccomap-update',
		'destroy'	=> 'ccomap-destroy'
	],
	'University' => [
		'create'	=> 'university-create',
		'read'		=> 0,//'university-read',
		'update'	=> 'university-update',
		'mission'	=> 'university-mission',
		'destroy'	=> 'university-destroy'
	],
	'Faculty' => [
		'create'	=> 'faculty-create',
		'read'		=> 'faculty-read',
		'update'	=> 'faculty-update',
		'destroy'	=> 'faculty-destroy'
	],
	'Department' => [
		'create'	=> 'department-create',
		'read'		=> 'department-read',
		'update'	=> 'department-update',
		'destroy'	=> 'department-destroy'
	],
	'Educational_program' => [
		'create'	=> 'edupro-create',
		'read'		=> 'edupro-read',
		'update'	=> 'edupro-update',
		'destroy'	=> 'edupro-destroy',
		'course'	=> 'edupro-course',
		'so'		=> 'edupro-so',
		'peo'		=> 'edupro-peo',
		'mapcoso'	=> 'edupro-mapcoso',
		'mapsopeo'	=> 'edupro-mapsopeo',
		'mappeoum'	=> 'edupro-mappeoum',
		'listcso'	=> 'edupro-listcso',
		'co_so_r4tr'   => 'edupro-cosor4tr',
		'course_so_r4tr'   => 'edupro-coursesor4tr'
	],
	'Univ_mission' => [
		'create'	=> 'um-create',
		'read'		=> 'um-read',
		'update'	=> 'um-update',
		'destroy'	=> 'um-destroy'
	],
	'Univ_mission_item' => [
		'create'	=> 'umi-create',
		'read'		=> 'umi-read',
		'update'	=> 'umi-update',
		'destroy'	=> 'umi-destroy'
	],
	'CourseInEduPro' => [
		'update'	=> 'courseinedupro-update',
		'read'		=> 'courseinedupro-read'
	],
	'CourseInEduProWithCO' => [
		'read'		=> 'courseineduprowithco-read'
	],
	'Course_required_level' => [
		'read'		=> 'courserequiredlevel-read'
	],
	'TestForExam' => [
		'read' => 'test4exam-read',
		'examRand' => 'exam-examrand',
		'exam' => 'test4exam-exam'
	],
	'Role' => [
		'read'		=> 0
	],
	//Quản lý các Content bên trong 1 Course
	'CourseContentTree' => [
		'create'	=> 'cctree-create',
		'read'		=> 'cctree-read',
		'destroy'	=> 'cctree-update',
		'update'	=> 'cctree-destroy'
	],
	'ContentQuestion' => [
		'create'	=> 'contentquestion-create',
		'read'		=> 'contentquestion-read',
		'destroy'	=> 'contentquestion-update',
		'update'	=> 'contentquestion-destroy'
	],
	'Course_content' => [
		'read'		=> 'coursecontent-read'
	],
	'Exam' => [
		'examRand' => 'exam-examrand',//for control
		'prepare' => 'exam-prepare',
		'start' => 'exam-start',
		'save' => 'exam-save',
		'finish' => 'exam-finish'
	],

	//Quản lý các Test
	'Test' => [
		'create'	=> 'test-create',
		'read'		=> 'test-read',
		'destroy'	=> 'test-destroy',
		'update'	=> 'test-update',
		'content'   => 'test-content',
		'review'   => 'test-review',
		'analyze'   => 0,//'test-analyze',
		'dtrand'   => 0,//'test-dtrand',
		'cc_co_r4t'   => 'test-cccor4t',
		'cc_co_r4tr'   => 'test-cccor4tr'
	],
	'QuestionAnalyze' => [
		'prepare' => 0,
		'read' => 0
	],
    'Test_review' => [
        'create' => 'testreview-create',
        'read' => 'testreview-read'
    ],
	//Quản lý các Test_section
	'Test_section' => [
		'create'	=> 'testsection-create',
		'read'		=> 'testsection-read',
		'destroy'	=> 'testsection-destroy',
		'update'	=> 'testsection-update'
	],
	'Topic' => [
		'create'	=> 'topic-create',
		'read'		=> 'topic-read',
		'destroy'	=> 'topic-destroy',
		'update'	=> 'topic-update'
	],
	'User' => [//Các chức năng này không cần thiết lập quyền
		'login'		=> 0,
		'loginOAuth2' => 0,
		'changeInfo' => 0,
		'register' => 0,
		'logout'	=> 0
	],
	'Question_group' => [
		'create'	=> 'questiongroup-create',
		'read'		=> 'questiongroup-read',
		'destroy'	=> 'questiongroup-destroy',
		'update'	=> 'questiongroup-update'
	],
	'MapQGroupQuestion' => [
		'create'	=> 'mapqgroupquestion-create',
		'read'		=> 'mapqgroupquestion-read',
		'update'	=> 'mapqgroupquestion-update'
	],
	'MapTopicQuestion' => [
		'create'	=> 'maptopicquestion-create',
		'read'		=> 'maptopicquestion-read',
		'update'	=> 'maptopicquestion-update'
	],
	'MapTopicQGroup' => [
		'create'	=> 'maptopicqgroup-create',
		'read'		=> 'maptopicqgroup-read',
		'update'	=> 'maptopicqgroup-update'
	],
	'MapQuestionQGroup' => [
		'create'	=> 'mapquestionqgroup-create',
		'read'		=> 'mapquestionqgroup-read',
		'update'	=> 'mapquestionqgroup-update'
	],
	'MapQuestionTopic' => [
		'create'	=> 'mapquestiontopic-create',
		'read'		=> 'mapquestiontopic-read',
		'update'	=> 'mapquestiontopic-update'
	],
	'MapQGroupTopic' => [
		'create'	=> 'mapqgrouptopic-create',
		'read'		=> 'mapqgrouptopic-read',
		'update'	=> 'mapqgrouptopic-update'
	],
	'MapCourseTopic' => [
		'create'	=> 'mapcoursetopic-create',
		'read'		=> 'mapcoursetopic-read',
		'update'	=> 'mapcoursetopic-update'
	],
	'MapContentQGroup' => [
		'create'	=> 'mapcontentqgroup-create',
		'read'		=> 'mapcontentqgroup-read',
		'update'	=> 'mapcontentqgroup-update'
	],
	'MapQGroupContent' => [
		'create'	=> 'mapqgroupcontent-create',
		'read'		=> 'mapqgroupcontent-read',
		'update'	=> 'mapqgroupcontent-update'
	],
	'TestSection' => [
		'create'	=> 'testsection-create',
		'read'		=> 'testsection-read',
		'destroy'	=> 'testsection-destroy',
		'update'	=> 'testsection-update'
	],
	'TestSourceQuestion' => [
		'read'		=> 'testsection-read',
		'destroy'	=> 'testsection-destroy',
		'changescore' => 'testsection-update'
	],
	'Bloom_level' => [
		'read' => 0
	],
	'Question_type_dict' => [
		'read' => 0
	]
];

Authorise::verifyAuthorize();